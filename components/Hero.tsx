import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Sparkles, Search, Map as MapIcon, ArrowRight, Heart, UserPlus, ChevronDown } from 'lucide-react';
import { AMBULANCE_DATA, CLINIC_DATA, API_BASE_URL } from '../constants';
import type { Map as LeafletMap, Marker } from 'leaflet';
import { LiveCase } from '../types';
import { useLiveCases } from '../hooks/useLiveCases';
import CaseCard from './CaseCard';
import CaseModal from './CaseModal';

// Animated count-up hook for stat numbers
function useCountUp(end: number, duration = 1500, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [end, duration, delay]);
  return value;
}

// Calculate distance between two points using Haversine formula
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const Hero: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const userMarkerRef = useRef<Marker | null>(null);
  const leafletRef = useRef<typeof import('leaflet') | null>(null);
  const [dailyCases, setDailyCases] = useState<number | string>('...');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [activeTab, setActiveTab] = useState<'ambulance' | 'clinic'>('ambulance');
  const [liveGpsData, setLiveGpsData] = useState<Map<string, {lat: number, lng: number}>>(new Map());
  const { cases: liveCases, totalCount, loading: liveCasesLoading } = useLiveCases(6);
  const [selectedCase, setSelectedCase] = useState<LiveCase | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [donationSelection, setDonationSelection] = useState<
    { type: 'monthly'; amount: 50 | 100 } |
    { type: 'onetime'; amount: 100 | 500 | 1000 } |
    { type: 'custom'; amount: string }
  >({ type: 'monthly', amount: 100 });

  // Animated count-up values for stats
  const countAmbulances = useCountUp(43, 1500, 400);
  const countVets = useCountUp(75, 1500, 600);

  // Set today's date
  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
  }, []);

  // Get user's location for sorting ambulances by distance
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  // Filter and sort by distance logic
  const filteredData = useMemo(() => {
    const data = activeTab === 'ambulance' ? AMBULANCE_DATA : CLINIC_DATA;
    const term = searchTerm.toLowerCase();
    let filtered = data.filter(item =>
      item.city.toLowerCase().includes(term) ||
      (item.area && item.area.toLowerCase().includes(term)) ||
      (item.areaOfOperations && item.areaOfOperations.toLowerCase().includes(term))
    );

    // Sort by distance if user location is available
    if (userLocation) {
      filtered = [...filtered].sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    return filtered;
  }, [searchTerm, activeTab, userLocation]);

  // Fetch daily cases
  useEffect(() => {
    fetch(`${API_BASE_URL}/cases/today/summary`)
      .then(res => res.json())
      .then(data => setDailyCases(data.totalCases))
      .catch(() => setDailyCases(142));
  }, []);

  // Fetch live GPS data for ambulances (match by device name)
  useEffect(() => {
    fetch(`${API_BASE_URL}/map/devices`)
      .then(res => res.json())
      .then((devices: any[]) => {
        const gpsMap = new Map<string, {lat: number, lng: number}>();
        devices.forEach(device => {
          if (!device.latitude || !device.longitude) return;
          const match = AMBULANCE_DATA.find(a =>
            a.deviceMatch && device.name?.toLowerCase().includes(a.deviceMatch.toLowerCase())
          );
          if (match) {
            gpsMap.set(match.id, { lat: device.latitude, lng: device.longitude });
          }
        });
        setLiveGpsData(gpsMap);
      })
      .catch(() => {});
  }, []);

  // Update marker positions when live GPS data arrives
  useEffect(() => {
    if (liveGpsData.size === 0) return;

    liveGpsData.forEach((coords, id) => {
      const marker = markersRef.current.get(id);
      if (marker) {
        marker.setLatLng([coords.lat, coords.lng]);
      }
    });
  }, [liveGpsData]);

  // Add blue dot for user's location on the map
  useEffect(() => {
    if (!userLocation || mapStatus !== 'ready' || !mapInstanceRef.current || !leafletRef.current) return;
    const L = leafletRef.current;

    // Remove previous marker if it exists
    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
    }

    const userIcon = L.divIcon({
      className: '',
      html: `<div style="position:relative;width:20px;height:20px;">
        <div class="user-location-pulse" style="position:absolute;inset:0;background:#3b82f6;border-radius:50%;"></div>
        <div style="position:absolute;inset:4px;background:#3b82f6;border:2.5px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>
      </div>`,
      iconSize: [20, 20] as [number, number],
      iconAnchor: [10, 10] as [number, number],
    });

    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 })
      .addTo(mapInstanceRef.current)
      .bindPopup('You are here');
  }, [userLocation, mapStatus]);

  // Initialize Map with dynamic Leaflet import
  useEffect(() => {
    if (!mapContainerRef.current) return;
    let cancelled = false;

    (async () => {
      try {
        const L = await import('leaflet');
        
        if (cancelled || !mapContainerRef.current) return;
        leafletRef.current = L;

        if (mapInstanceRef.current) return;

        const map = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
          dragging: !L.Browser.mobile
        }).setView([28, 71], 5);

        if (L.Browser.mobile) {
          map.dragging.enable();
          (map as any).tap?.enable();
        }

        mapInstanceRef.current = map;
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Locate Me button (above zoom controls)
        const LocateControl = L.Control.extend({
          options: { position: 'bottomright' as const },
          onAdd: function () {
            const btn = L.DomUtil.create('div', '');
            btn.innerHTML = `<button style="
              width: 34px; height: 34px; background: white; border: none; border-radius: 4px;
              box-shadow: 0 1px 5px rgba(0,0,0,0.25); cursor: pointer; display: flex;
              align-items: center; justify-content: center; margin-bottom: 8px;
            " title="My location">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
              </svg>
            </button>`;
            L.DomEvent.disableClickPropagation(btn);
            btn.querySelector('button')!.addEventListener('click', () => {
              if (userLocation) {
                map.flyTo([userLocation.lat, userLocation.lng], 13, { animate: true, duration: 1 });
              } else if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                    setUserLocation(loc);
                    map.flyTo([loc.lat, loc.lng], 13, { animate: true, duration: 1 });
                  },
                  () => alert('Could not get your location. Please enable location access.'),
                  { enableHighAccuracy: true, timeout: 10000 }
                );
              }
            });
            return btn;
          },
        });
        new LocateControl().addTo(map);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 20
        }).addTo(map);

        const createIcon = (isSelected: boolean) => L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="
            background-color: ${isSelected ? '#b91c1c' : '#ef4444'};
            width: ${isSelected ? '36px' : '28px'};
            height: ${isSelected ? '36px' : '28px'};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s ease;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="${isSelected ? '18' : '14'}" height="${isSelected ? '18' : '14'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>`,
          iconSize: isSelected ? [36, 36] as [number, number] : [28, 28] as [number, number],
          iconAnchor: isSelected ? [18, 18] as [number, number] : [14, 14] as [number, number],
        });

        AMBULANCE_DATA.forEach(ambulance => {
          const marker = L.marker([ambulance.lat, ambulance.lng], { icon: createIcon(false) })
            .addTo(map)
            .bindPopup(`<b>${ambulance.city}</b><br>${ambulance.phone}`);
          markersRef.current.set(ambulance.id, marker);
        });

        setMapStatus('ready');
      } catch {
        if (!cancelled) setMapStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const flyToLocation = (item: { id: string; phone: string; lat: number; lng: number }) => {
    // Try to get live GPS coordinates, fallback to static
    const liveCoords = liveGpsData.get(item.id);

    const lat = liveCoords?.lat || item.lat;
    const lng = liveCoords?.lng || item.lng;

    setSelectedAmbulanceId(item.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
      mapInstanceRef.current.closePopup();

      // On mobile, scroll to map when an ambulance is selected
      if (window.innerWidth < 1024) {
        document.getElementById('ambulance-map-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };


  return (
    <div id="home" className="relative bg-gradient-to-br from-[#FFFBF5] via-[#FEF7ED] to-[#FDF0DB] flex flex-col pt-16 lg:h-screen lg:overflow-hidden">
      {/* Decorative background blobs — varied animation speeds for organic movement */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-[#B8650A]/10 rounded-full blur-3xl pointer-events-none animate-float-soft" />
      <div className="absolute bottom-40 right-10 w-56 h-56 bg-[#D87E0F]/8 rounded-full blur-3xl pointer-events-none" style={{ animation: 'floatSoft 9s ease-in-out infinite' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#B7312C]/6 rounded-full blur-3xl pointer-events-none" style={{ animation: 'floatSoft 11s ease-in-out infinite' }} />

      <div className="flex flex-col lg:flex-row w-full flex-1 lg:h-full">
        
        {/* LEFT COLUMN: Mission Control (Title, Stats, Live Feed) */}
        {/* Mobile: Natural scroll. Desktop: Internal scroll */}
        <div className="w-full lg:w-[45%] flex flex-col p-5 md:p-6 lg:p-6 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5] to-[#FEF7ED] z-20 shadow-xl lg:shadow-[8px_0_30px_-5px_rgba(28,25,23,0.08)] lg:overflow-y-auto order-1">
          
          {/* 1. Header & Title */}
          <div className="mb-3 md:mb-4">
            <div className="animate-fadeUp animate-badgeGlow inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3E7] border border-[#FDDBB8] text-[#B8650A] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} />
              <span>Vision of Param Namramuni Gurudev</span>
            </div>
            <h1 className="animate-fadeUp text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#292524] leading-tight mb-2 tracking-[-0.03em]" style={{ fontFamily: "'Open Runde', sans-serif", animationDelay: '100ms', textShadow: '0 2px 8px rgba(28,25,23,0.06)' }}>
              India's Fast & Free <br /><span className="bg-gradient-to-r from-[#B7312C] via-[#B8650A] to-[#B7312C] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Animal Ambulance Network</span>
            </h1>
            <p className="animate-fadeUp text-[#57534E] text-base md:text-lg font-normal leading-relaxed max-w-xl" style={{ fontFamily: "'Open Runde', sans-serif", animationDelay: '200ms' }}>
              On-site, free first-aid and treatment for every injured street animal.
            </p>
            <div className="animate-fadeUp flex items-center gap-3 mt-2" style={{ animationDelay: '250ms' }}>
              <div className="h-0.5 w-16 bg-gradient-to-r from-[#B7312C] via-[#B8650A] to-[#D87E0F] rounded-full" />
              <img src="/images/aysg-logo.webp" alt="AYSG" className="w-6 h-6 rounded" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#9A5508] via-[#D87E0F] to-[#9A5508] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Powered by Arham Yuva Seva Group</span>
            </div>
          </div>

          {/* 2. Impact Stats Row */}
          <div className="animate-fadeUp grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 md:mb-4" style={{ animationDelay: '300ms' }}>

            {/* Card 1 */}
            <div className="group bg-white/60 backdrop-blur-sm p-2.5 md:p-3 rounded-xl border border-[#F9E8C9] border-l-4 border-l-[#B7312C] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(28,25,23,0.1)] transition-all duration-300 flex flex-col shadow-[0_1px_2px_rgba(28,25,23,0.04),0_4px_12px_rgba(28,25,23,0.06)]" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <div className="text-[11px] md:text-xs text-[#78716C] font-bold uppercase tracking-wider bg-[#FEF7ED] inline-block px-1.5 py-0.5 rounded mb-1 self-start">{currentDate}</div>
              <div className="text-xl md:text-2xl font-black text-[#292524] group-hover:scale-105 transition-transform origin-left">
                {dailyCases === '...' ? (
                  <span className="inline-block w-12 h-6 bg-[#FDF0DB] rounded animate-pulse"></span>
                ) : (
                  dailyCases
                )}
              </div>
              <div className="text-[11px] md:text-xs text-[#78716C] font-medium leading-tight mt-auto">Cases Treated Today</div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/60 backdrop-blur-sm p-2.5 md:p-3 rounded-xl border border-[#F9E8C9] border-l-4 border-l-[#B7312C] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(28,25,23,0.1)] transition-all duration-300 flex flex-col shadow-[0_1px_2px_rgba(28,25,23,0.04),0_4px_12px_rgba(28,25,23,0.06)]" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <div className="text-[11px] md:text-xs text-[#78716C] font-bold uppercase tracking-wider mb-1">Lives Saved</div>
              <div className="text-xl md:text-2xl font-black text-[#B7312C] group-hover:scale-105 transition-transform origin-left">1.5 Lakh+</div>
              <div className="text-[11px] md:text-xs text-[#78716C] font-medium leading-tight mt-auto">In Last 3 Years</div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/60 backdrop-blur-sm p-2.5 md:p-3 rounded-xl border border-[#F9E8C9] border-l-4 border-l-[#B8650A] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(28,25,23,0.1)] transition-all duration-300 flex flex-col shadow-[0_1px_2px_rgba(28,25,23,0.04),0_4px_12px_rgba(28,25,23,0.06)]" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <div className="text-[11px] md:text-xs text-[#78716C] font-bold uppercase tracking-wider mb-1">Across India</div>
              <div className="text-xl md:text-2xl font-black text-[#292524] group-hover:scale-105 transition-transform origin-left">{countAmbulances}+</div>
              <div className="text-[11px] md:text-xs text-[#78716C] font-medium leading-tight mt-auto">Ambulance & Clinics</div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white/60 backdrop-blur-sm p-2.5 md:p-3 rounded-xl border border-[#F9E8C9] border-l-4 border-l-[#5F8A65] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(28,25,23,0.1)] transition-all duration-300 flex flex-col shadow-[0_1px_2px_rgba(28,25,23,0.04),0_4px_12px_rgba(28,25,23,0.06)]" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <div className="text-[11px] md:text-xs text-[#78716C] font-bold uppercase tracking-wider mb-1">On Ground</div>
              <div className="text-xl md:text-2xl font-black text-[#292524] group-hover:scale-105 transition-transform origin-left">{countVets}+</div>
              <div className="text-[11px] md:text-xs text-[#78716C] font-medium leading-tight mt-auto">Vets & Paravets</div>
            </div>

          </div>

          {/* 3. Live Cases Feed (Light Theme) */}
          <div className="animate-fadeUp flex-1 min-h-0 bg-[#FEF3E7]/50 border border-[#FDDBB8] animate-borderGlow rounded-2xl p-3 md:p-4 mb-3 flex flex-col shadow-sm" style={{ animationDelay: '400ms' }}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold flex items-center gap-2 text-[#292524] text-sm md:text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B7312C] animate-pulse ring-4 ring-[rgba(183,49,44,0.1)]"></span>
                Live Cases
                <span className="text-xs text-[#A8A29E] font-normal">&middot; {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </h2>
              <span className="btn-shine text-xs text-[#B8650A] bg-[#FEF3E7] border border-[#FDDBB8] px-2 py-1 rounded font-medium">Real-time Feed</span>
            </div>
            
            <div className="space-y-3 overflow-y-auto scrollbar-hide pr-2 flex-1 min-h-0">
              {liveCasesLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white border border-[#F9E8C9] p-3 rounded-xl animate-pulse">
                    <div className="h-4 bg-[#FDF0DB] rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-[#FEF7ED] rounded w-2/3"></div>
                  </div>
                ))
              ) : liveCases.length === 0 ? (
                <div className="text-center py-8 text-[#78716C]">No cases found</div>
              ) : (
                liveCases.map((item) => (
                  <CaseCard key={item.id} liveCase={item} onSelect={setSelectedCase} variant="feed" />
                ))
              )}
            </div>
            <Link href="/live-impact" className="w-full mt-3 text-xs text-center text-[#78716C] hover:text-[#B7312C] font-medium flex items-center justify-center gap-1 transition-colors py-2">
              View all cases <ArrowRight size={12} />
            </Link>
          </div>

          {/* 4. Action Buttons (Donate + Volunteer) */}
          {/* Stack on mobile, row on larger screens */}
          <div className="animate-fadeUp flex flex-row gap-3 justify-center" style={{ animationDelay: '500ms' }}>
             <a href="#donate" className="group btn-shine bg-gradient-to-b from-[#C93B36] to-[#9A2823] active:scale-[0.97] text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-[0_8px_24px_rgba(183,49,44,0.3),0_0_20px_rgba(183,49,44,0.15)] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 text-sm" style={{ boxShadow: '0 4px 12px rgba(183,49,44,0.25), inset 0 1px 0 rgba(255,255,255,0.15)', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
                <Heart size={16} className="fill-current group-hover:scale-110 transition-transform duration-300" />
                Donate Now
             </a>
             <a href="#volunteer" className="group btn-shine bg-gradient-to-b from-[#3D3836] to-[#1C1917] active:scale-[0.97] text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-[0_8px_24px_rgba(28,25,23,0.2)] hover:from-[#44403C] hover:to-[#292524] hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 text-sm whitespace-nowrap" style={{ boxShadow: '0 4px 12px rgba(28,25,23,0.15), inset 0 1px 0 rgba(255,255,255,0.08)', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
                <UserPlus size={16} className="group-hover:scale-110 transition-transform duration-300" />
                Join as Volunteer
             </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Map + List */}
        <div id="ambulance-map-col" className="w-full lg:w-[55%] relative bg-[#FEF7ED] flex flex-col lg:block order-2">

           {/* The Map Container */}
           <div
             id="ambulance-map-container"
             className="w-full h-[300px] lg:h-full z-0 shrink-0 shadow-md lg:shadow-none relative"
           >
             <div ref={mapContainerRef} className="w-full h-full" />

             {/* Map Loading State */}
             {mapStatus === 'loading' && (
               <div className="absolute inset-0 bg-[#FEF7ED] flex flex-col items-center justify-center z-10">
                 <div className="w-12 h-12 border-4 border-[#FDDBB8] border-t-[#B8650A] rounded-full animate-spin mb-4"></div>
                 <p className="text-[#57534E] font-medium">Loading map...</p>
               </div>
             )}

             {/* Map Error State */}
             {mapStatus === 'error' && (
               <div className="absolute inset-0 bg-[#FEF7ED] flex flex-col items-center justify-center z-10 p-6 text-center">
                 <MapPin className="w-16 h-16 text-[#E8E0D8] mb-4" />
                 <p className="text-[#292524] font-bold text-lg mb-2">Map Unavailable</p>
                 <p className="text-[#78716C] text-sm mb-4">Please use the list below to find an ambulance near you.</p>
                 <button
                   onClick={() => window.location.reload()}
                   className="px-4 py-2 bg-[#B7312C] text-white rounded-lg text-sm font-medium hover:bg-[#9A2823] transition-colors"
                 >
                   Try Again
                 </button>
               </div>
             )}
           </div>

           {/* Desktop Floating List (Hidden on Mobile) */}
           <div className="absolute top-4 left-4 bottom-4 w-[340px] bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_40px_rgba(28,25,23,0.12),0_2px_8px_rgba(28,25,23,0.08)] z-40 flex flex-col border border-white/50 hidden lg:flex">
              
              {/* List Header */}
              <div className="p-4 border-b border-[#F9E8C9]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" size={16} />
                  <input
                    type="text"
                    placeholder="Search city, area, or neighborhood..."
                    className="w-full pl-9 pr-4 py-2.5 bg-[#FEF7ED] border border-[#F9E8C9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8650A]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setActiveTab('ambulance')}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md shadow-sm transition-colors ${
                      activeTab === 'ambulance'
                        ? 'bg-[#292524] text-white'
                        : 'bg-[#FEF7ED] text-[#78716C] hover:bg-[#FDF0DB] border border-[#F9E8C9]'
                    }`}
                  >
                    Ambulance
                  </button>
                  <button
                    onClick={() => setActiveTab('clinic')}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${
                      activeTab === 'clinic'
                        ? 'bg-[#292524] text-white shadow-sm'
                        : 'bg-[#FEF7ED] text-[#78716C] hover:bg-[#FDF0DB] border border-[#F9E8C9]'
                    }`}
                  >
                    Clinics
                  </button>
                </div>
              </div>

              {/* List Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredData.length === 0 ? (
                  <div className="text-center py-8 text-[#78716C]">
                    <p>No {activeTab === 'ambulance' ? 'ambulances' : 'clinics'} found{searchTerm && ` matching "${searchTerm}"`}</p>
                  </div>
                ) : (
                  filteredData.map(item => {
                    const isExpanded = expandedCardId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`rounded-lg border cursor-pointer transition-all ${
                          selectedAmbulanceId === item.id
                          ? 'bg-[#FEF3E7] border-[#B8650A] ring-1 ring-[#B8650A]/20'
                          : 'bg-white border-[#F9E8C9] hover:border-[#B8650A]/30 hover:bg-[#FFFBF5] hover:shadow-sm'
                        }`}
                      >
                        {/* Collapsed — always visible */}
                        <button
                          type="button"
                          onClick={() => setExpandedCardId(isExpanded ? null : item.id)}
                          className="w-full text-left p-3"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0 mr-2">
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-sm text-[#292524] truncate">{item.area ? `${item.area}, ${item.city}` : item.city}</h4>
                              </div>
                              <div className="text-[11px] text-[#A8A29E] font-medium mt-0.5">{item.state}</div>
                              {item.areaOfOperations.length > 0 && (
                                <p className="text-[11px] text-[#78716C] mt-1 truncate">{item.areaOfOperations}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <a href={`tel:${item.phone.replace(/\s/g, '')}`} aria-label={`Call ${item.city}`} className="bg-[#FEF3E7] p-2 rounded-full text-[#B7312C] hover:bg-[#B7312C] hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                                <Phone size={13} />
                              </a>
                              <ChevronDown size={14} className={`text-[#A8A29E] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                        </button>

                        {/* Expanded — extra details */}
                        <div
                          className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{ maxHeight: isExpanded ? '200px' : '0px', opacity: isExpanded ? 1 : 0 }}
                        >
                          <div className="px-3 pb-3 pt-0 border-t border-[#F9E8C9]">
                            {item.areaOfOperations.length > 0 && (
                              <div className="mt-2">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">Coverage Areas</p>
                                <p className="text-[12px] text-[#57534E] leading-relaxed">{item.areaOfOperations}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">Type:</span>
                              <span className="text-[11px] font-semibold text-[#B8650A] bg-[#FEF3E7] px-2 py-0.5 rounded-full">{item.category}</span>
                            </div>
                            <div className="mt-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">Operated by:</span>
                              <span className="text-[12px] text-[#57534E] ml-1">{item.operatedBy}</span>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); flyToLocation(item); }}
                              className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#E8E0D8] text-[#57534E] font-semibold text-xs hover:bg-[#FEF3E7] hover:border-[#B8650A]/30 transition-colors"
                            >
                              <MapIcon size={13} />
                              Show on Map
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
           </div>

           {/* Donation Widget — normal flow on mobile, floating on desktop */}
           <div className="relative mx-4 my-3 lg:absolute lg:top-4 lg:right-8 lg:mx-0 lg:my-0 w-auto lg:w-[360px] bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_40px_rgba(28,25,23,0.12),0_2px_8px_rgba(28,25,23,0.08)] z-40 border border-white/50 flex flex-col p-5 pb-3">
             {/* Header */}
             <div className="flex items-start gap-3 mb-3">
               <span className="text-2xl leading-none mt-0.5">❤️</span>
               <div>
                 <h4 className="font-bold text-base text-[#292524]">Save Injured Street Animals</h4>
                 <p className="text-sm text-[#57534E]">₹100 helps one injured animal · <span className="text-[#B7312C] font-semibold whitespace-nowrap">1.5L+ saved</span></p>
               </div>
             </div>

             {/* Support Monthly */}
             <p className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-2.5">Support Monthly (Recommended)</p>
             <div className="grid grid-cols-2 gap-2.5 mb-3">
               <button
                 onClick={() => setDonationSelection({ type: 'monthly', amount: 50 })}
                 className={`p-2 rounded-lg border text-center transition-all ${
                   donationSelection.type === 'monthly' && donationSelection.amount === 50
                     ? 'border-[#B8650A] bg-[#FEF3E7]/50'
                     : 'border-[#E8E0D8] hover:border-[#B8650A]/30'
                 }`}
               >
                 <div className="text-base font-bold text-[#292524]">₹50 / day</div>
                 <div className="text-xs text-[#A8A29E]">₹1500 / month</div>
               </button>
               <button
                 onClick={() => setDonationSelection({ type: 'monthly', amount: 100 })}
                 className={`p-2 rounded-lg border text-center transition-all ${
                   donationSelection.type === 'monthly' && donationSelection.amount === 100
                     ? 'border-[#B8650A] bg-[#FEF3E7]/60'
                     : 'border-[#E8E0D8] hover:border-[#B8650A]/30'
                 }`}
               >
                 <div className="text-base font-bold text-[#B7312C]">₹100 / day</div>
                 <div className="text-xs text-[#A8A29E]">₹3000 / month</div>
               </button>
             </div>

             {/* One-time donation */}
             <p className="text-xs font-bold text-[#78716C] uppercase tracking-wider mb-2.5">One-time donation</p>
             <div className="grid grid-cols-4 gap-2 mb-3">
               {([100, 500, 1000] as const).map((val) => (
                 <button
                   key={val}
                   onClick={() => setDonationSelection({ type: 'onetime', amount: val })}
                   className={`py-2 rounded-lg border text-sm font-semibold transition-all ${
                     donationSelection.type === 'onetime' && donationSelection.amount === val
                       ? 'border-[#B8650A] bg-[#FEF3E7] text-[#B8650A]'
                       : 'border-[#E8E0D8] text-[#57534E] hover:border-[#B8650A]/30'
                   }`}
                 >
                   {`₹${val}`}
                 </button>
               ))}
               {donationSelection.type === 'custom' ? (
                 <div className="relative">
                   <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-[#A8A29E]">₹</span>
                   <input
                     type="number"
                     autoFocus
                     placeholder="Amt"
                     value={donationSelection.amount}
                     onChange={(e) => setDonationSelection({ type: 'custom', amount: e.target.value })}
                     className="w-full py-2 pl-6 pr-1 rounded-lg border border-[#B8650A] bg-[#FEF3E7] text-sm font-semibold text-[#B8650A] focus:outline-none focus:ring-1 focus:ring-[#B8650A]"
                   />
                 </div>
               ) : (
                 <button
                   onClick={() => setDonationSelection({ type: 'custom', amount: '' })}
                   className="py-2 rounded-lg border text-sm font-semibold transition-all border-[#E8E0D8] text-[#57534E] hover:border-[#B8650A]/30"
                 >
                   Custom
                 </button>
               )}
             </div>

             {/* Donate button */}
             <a
               href="#donate"
               className="btn-shine w-full bg-[#B7312C] hover:bg-[#9A2823] text-white py-3 rounded-full font-bold text-base text-center flex items-center justify-center gap-2 shadow-lg shadow-[rgba(183,49,44,0.2)] hover:shadow-xl transition-all duration-200"
             >
               <span>❤️</span>
               Donate
             </a>
           </div>

           {/* Mobile List Section (Visible only on Mobile) */}
           <div className="lg:hidden flex flex-col bg-[#FEF7ED] border-t border-[#F9E8C9]">

              {/* Filter/Search Bar for Mobile - Fixed top relative to this section */}
              <div className="p-4 pb-2 bg-[#FEF7ED] z-10 sticky top-0">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-[#F9E8C9]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" size={18} />
                    <input
                      type="text"
                      placeholder="Search city, area, or neighborhood..."
                      className="w-full pl-10 pr-4 py-2 bg-[#FEF7ED] border border-[#F9E8C9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B8650A]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Mobile Toggle Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setActiveTab('ambulance')}
                      className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${
                        activeTab === 'ambulance'
                          ? 'bg-[#292524] text-white shadow-sm'
                          : 'bg-[#FAF7F4] text-[#78716C] hover:bg-[#F5F0EB] border border-[#E8E0D8]'
                      }`}
                    >
                      Ambulance
                    </button>
                    <button
                      onClick={() => setActiveTab('clinic')}
                      className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors ${
                        activeTab === 'clinic'
                          ? 'bg-[#292524] text-white shadow-sm'
                          : 'bg-[#FAF7F4] text-[#78716C] hover:bg-[#F5F0EB] border border-[#E8E0D8]'
                      }`}
                    >
                      Clinics
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards List - Internally Scrollable */}
              <div className="px-4 pb-8 overflow-y-auto scrollbar-hide max-h-[55vh]">
                 <div className="space-y-3">
                     {filteredData.map(item => {
                        const isExpanded = expandedCardId === item.id;
                        return (
                          <div
                             key={item.id}
                             className={`bg-white rounded-xl shadow-sm border transition-all ${selectedAmbulanceId === item.id ? 'border-[#B7312C] ring-1 ring-[rgba(183,49,44,0.1)]' : 'border-[#F9E8C9]'}`}
                          >
                             {/* Collapsed — always visible */}
                             <button
                               type="button"
                               onClick={() => setExpandedCardId(isExpanded ? null : item.id)}
                               className="w-full text-left p-4"
                             >
                               <div className="flex justify-between items-start">
                                  <div className="flex-1 min-w-0 mr-3">
                                     <h3 className="font-bold text-base text-[#292524]">{item.area ? `${item.area}, ${item.city}` : item.city}</h3>
                                     <p className="text-[12px] text-[#A8A29E] font-medium mt-0.5">{item.state}</p>
                                     {item.areaOfOperations.length > 0 && (
                                       <p className="text-[12px] text-[#78716C] mt-1 line-clamp-1">{item.areaOfOperations}</p>
                                     )}
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                     <a
                                       href={`tel:${item.phone.replace(/\s/g, '')}`}
                                       onClick={(e) => e.stopPropagation()}
                                       className="bg-[#B7312C] text-white p-2.5 rounded-full hover:bg-[#9A2823] transition-colors shadow-sm shadow-[rgba(183,49,44,0.2)]"
                                     >
                                       <Phone size={15} className="fill-current" />
                                     </a>
                                     <ChevronDown size={16} className={`text-[#A8A29E] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                  </div>
                               </div>
                             </button>

                             {/* Expanded — extra details */}
                             <div
                               className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                               style={{ maxHeight: isExpanded ? '280px' : '0px', opacity: isExpanded ? 1 : 0 }}
                             >
                               <div className="px-4 pb-4 pt-0 border-t border-[#F9E8C9]">
                                 {item.areaOfOperations.length > 0 && (
                                   <div className="mt-3">
                                     <p className="text-[11px] font-bold uppercase tracking-wider text-[#A8A29E] mb-1">Coverage Areas</p>
                                     <p className="text-[13px] text-[#57534E] leading-relaxed">{item.areaOfOperations}</p>
                                   </div>
                                 )}
                                 <div className="flex flex-wrap items-center gap-2 mt-2.5">
                                   <span className="text-[11px] font-semibold text-[#B8650A] bg-[#FEF3E7] px-2.5 py-1 rounded-full">{item.category}</span>
                                   <span className="text-[11px] text-[#57534E] bg-[#F5F0EB] px-2.5 py-1 rounded-full">{item.operatedBy}</span>
                                 </div>
                                 <div className="mt-3">
                                   <p className="text-[12px] text-[#78716C] mb-2">+91 {item.phone}</p>
                                   <button
                                     onClick={(e) => { e.stopPropagation(); flyToLocation(item); }}
                                     className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#E8E0D8] text-[#57534E] font-semibold text-sm hover:bg-[#FFFBF5] transition-colors"
                                   >
                                     <MapIcon size={16} />
                                     Show on Map
                                   </button>
                                 </div>
                               </div>
                             </div>
                          </div>
                        );
                     })}
                     {filteredData.length === 0 && (
                        <div className="text-center py-8 text-[#78716C] bg-white rounded-xl border border-[#F9E8C9] border-dashed">
                           <p>No {activeTab === 'ambulance' ? 'ambulances' : 'clinics'} found{searchTerm && ` matching "${searchTerm}"`}</p>
                        </div>
                     )}
                 </div>
              </div>
           </div>

        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <CaseModal liveCase={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </div>
  );
};

export default Hero;
