import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* GTM loaded via next/script in _app.tsx for better performance */}

        {/* Favicon */}
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color */}
        <meta name="theme-color" content="#B7312C" />

        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/OpenRunde-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/OpenRunde-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* DNS prefetch / preconnect for external domains */}
        <link rel="dns-prefetch" href="https://api-alwayscare.arham.org" />
        <link rel="preconnect" href="https://api-alwayscare.arham.org" crossOrigin="anonymous" />

        {/* Structured Data: Organization/NGO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "NGO"],
              "@id": "https://alwayscare.org/#organization",
              "name": "Arham Animal Ambulance",
              "alternateName": ["Always Care", "AYSG Always Care"],
              "url": "https://alwayscare.org",
              "logo": "https://alwayscare.org/images/alwayscare-logo-original.png",
              "image": "https://alwayscare.org/images/alwayscare-logo-original.png",
              "description": "India's largest free animal ambulance network providing emergency rescue, treatment, and care for injured street animals across 40+ cities.",
              "email": "support@alwayscare.org",
              "slogan": "Always Care for every life",
              "parentOrganization": {
                "@type": "Organization",
                "name": "Arham Yuva Seva Group",
                "url": "https://arham.org"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              },
              "foundingLocation": {
                "@type": "Place",
                "name": "Ahmedabad, Gujarat, India"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "emergency",
                "availableLanguage": ["English", "Hindi", "Gujarati"]
              },
              "areaServed": [
                {"@type": "Country", "name": "India"},
                {"@type": "State", "name": "Gujarat"},
                {"@type": "State", "name": "Maharashtra"},
                {"@type": "City", "name": "Mumbai"},
                {"@type": "City", "name": "Ahmedabad"},
                {"@type": "City", "name": "Delhi"},
                {"@type": "City", "name": "Pune"},
                {"@type": "City", "name": "Surat"},
                {"@type": "City", "name": "Chennai"},
                {"@type": "City", "name": "Hyderabad"},
                {"@type": "City", "name": "Indore"},
                {"@type": "City", "name": "Nagpur"},
                {"@type": "City", "name": "Vadodara"},
                {"@type": "City", "name": "Jamnagar"},
                {"@type": "City", "name": "Rajkot"},
                {"@type": "City", "name": "Junagadh"},
                {"@type": "City", "name": "Bengaluru"},
                {"@type": "City", "name": "Kolkata"}
              ],
              "sameAs": [
                "https://www.facebook.com/arhamalwayscare",
                "https://www.instagram.com/alwayscareindia/",
                "https://x.com/AlwaysCareIndia",
                "https://www.youtube.com/@ArhamAlwaysCare",
                "https://whatsapp.com/channel/0029Vb6iSj8I7BeIaONOIo2N"
              ],
              "knowsAbout": [
                "Animal rescue",
                "Emergency veterinary care",
                "Street animal welfare",
                "Animal ambulance service",
                "Veterinary first aid"
              ],
              "makesOffer": {
                "@type": "Offer",
                "name": "Free Animal Ambulance Service",
                "description": "Emergency rescue and on-site treatment for injured street animals, completely free of charge",
                "price": "0",
                "priceCurrency": "INR",
                "areaServed": { "@type": "Country", "name": "India" }
              },
              "potentialAction": {
                "@type": "DonateAction",
                "name": "Donate to Arham Animal Ambulance",
                "target": "https://alwayscare.org/#donate",
                "description": "Support free animal rescue and treatment across India"
              }
            }),
          }}
        />

        {/* Structured Data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://alwayscare.org/#website",
              "name": "Arham Animal Ambulance",
              "alternateName": "Always Care",
              "url": "https://alwayscare.org",
              "publisher": { "@id": "https://alwayscare.org/#organization" }
            }),
          }}
        />

        {/* Structured Data: VeterinaryClinic[] */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "VeterinaryClinic",
                "@id": "https://alwayscare.org/#clinic-ghatkopar",
                "name": "Always Care Animal Clinic — Ghatkopar",
                "parentOrganization": { "@id": "https://alwayscare.org/#organization" },
                "address": {"@type": "PostalAddress", "addressLocality": "Ghatkopar, Mumbai", "addressRegion": "Maharashtra", "addressCountry": "IN"},
                "geo": {"@type": "GeoCoordinates", "latitude": 19.080052, "longitude": 72.896424},
                "telephone": "+917463036303",
                "priceRange": "Free",
                "openingHours": "Mo-Su 00:00-23:59"
              },
              {
                "@context": "https://schema.org",
                "@type": "VeterinaryClinic",
                "@id": "https://alwayscare.org/#clinic-kandivali",
                "name": "Always Care Animal Clinic — Kandivali",
                "parentOrganization": { "@id": "https://alwayscare.org/#organization" },
                "address": {"@type": "PostalAddress", "addressLocality": "Kandivali, Mumbai", "addressRegion": "Maharashtra", "addressCountry": "IN"},
                "geo": {"@type": "GeoCoordinates", "latitude": 19.21471, "longitude": 72.842772},
                "telephone": "+917304983822",
                "priceRange": "Free",
                "openingHours": "Mo-Su 00:00-23:59"
              },
              {
                "@context": "https://schema.org",
                "@type": "VeterinaryClinic",
                "@id": "https://alwayscare.org/#clinic-rajkot",
                "name": "Always Care Animal Clinic — Rajkot",
                "parentOrganization": { "@id": "https://alwayscare.org/#organization" },
                "address": {"@type": "PostalAddress", "addressLocality": "Rajkot", "addressRegion": "Gujarat", "addressCountry": "IN"},
                "geo": {"@type": "GeoCoordinates", "latitude": 22.2988637, "longitude": 70.7753995},
                "telephone": "+917567075680",
                "priceRange": "Free",
                "openingHours": "Mo-Su 00:00-23:59"
              },
              {
                "@context": "https://schema.org",
                "@type": "VeterinaryClinic",
                "@id": "https://alwayscare.org/#clinic-junagadh",
                "name": "Always Care Animal Clinic — Junagadh",
                "parentOrganization": { "@id": "https://alwayscare.org/#organization" },
                "address": {"@type": "PostalAddress", "addressLocality": "Junagadh", "addressRegion": "Gujarat", "addressCountry": "IN"},
                "telephone": "+919913910108",
                "priceRange": "Free",
                "openingHours": "Mo-Su 00:00-23:59"
              }
            ]),
          }}
        />

        {/* Custom styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { font-family: 'Open Runde', sans-serif; }
              ::-webkit-scrollbar { width: 4px; }
              ::-webkit-scrollbar-track { background: #f1f1f1; }
              ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
              ::-webkit-scrollbar-thumb:hover { background: #888; }
              .scrollbar-hide::-webkit-scrollbar { display: none; }
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
              .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .7; }
              }
              .leaflet-popup-content-wrapper { border-radius: 12px; }
              .leaflet-popup-content { margin: 12px; font-family: 'Open Runde', sans-serif; }
            `,
          }}
        />
      </Head>
      <body className="bg-[#FFFBF5] text-[#292524]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWFC97WX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />

        <noscript>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Open Runde',system-ui,sans-serif", color: '#292524' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
              <img src="/images/arham-alwayscare-logo.webp" alt="Arham Animal Ambulance — Always Care" width="200" height="60" style={{ margin: '0 auto 16px', display: 'block' }} />
              <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px' }}>Arham Animal Ambulance | Always Care</h1>
              <p style={{ fontSize: '16px', color: '#57534E', margin: 0 }}>India&apos;s largest free animal ambulance network — emergency rescue, treatment, and care for injured street animals across 40+ cities.</p>
            </header>

            <main>
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 12px' }}>About Us</h2>
                <p style={{ color: '#57534E', lineHeight: 1.7 }}>Arham Animal Ambulance operates 43+ fully-equipped ambulances with trained veterinarians and paravets dispatched free of charge. We also run 4 free animal clinics and have an animal hospital under construction. Over 1.5 lakh (150,000+) animals have been rescued and treated in the last 3 years. Every service is 100% free — no animal is ever turned away.</p>
                <p style={{ color: '#57534E', lineHeight: 1.7 }}>Operated by Arham Yuva Seva Group (AYSG), a youth-driven non-profit inspired by Param Gurudev Shree Namramuni Maharaj Saheb, rooted in the Jain principle of Ahimsa (non-violence).</p>
              </section>

              <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 12px' }}>Our Services</h2>
                <ul style={{ color: '#57534E', lineHeight: 1.8, paddingLeft: '20px' }}>
                  <li><strong>Emergency Rescue:</strong> 43+ ambulances across 15+ cities, dispatched within minutes of a call</li>
                  <li><strong>On-Site First Aid:</strong> Free immediate treatment at the location of the injured animal</li>
                  <li><strong>Animal Clinics:</strong> 4 free clinics (Mumbai Ghatkopar, Mumbai Kandivali, Rajkot, Junagadh)</li>
                  <li><strong>Surgery &amp; Rehabilitation:</strong> Complete post-operative recovery, entirely free of charge</li>
                  <li><strong>Animal Hospital:</strong> State-of-the-art facility under construction</li>
                </ul>
              </section>

              <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 12px' }}>Cities We Serve</h2>
                <p style={{ color: '#57534E', lineHeight: 1.7 }}><strong>Gujarat:</strong> Ahmedabad, Bhavnagar, Gondal, Junagadh, Palitana, Surat, Vadodara, Veraval, Jamnagar, Mandvi (Kutch)</p>
                <p style={{ color: '#57534E', lineHeight: 1.7 }}><strong>Maharashtra:</strong> Mumbai (Andheri, Malad, Mira Road, Ghatkopar, Mulund, Kandivali, Dadar), Nagpur, Pune</p>
                <p style={{ color: '#57534E', lineHeight: 1.7 }}><strong>Other Cities:</strong> Delhi, Chennai, Hyderabad, Indore</p>
                <p style={{ color: '#57534E', lineHeight: 1.7 }}><strong>NGO Partners:</strong> Bengaluru, Kolkata, Wadala, Rajkot, Vapi</p>
              </section>

              <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 12px' }}>Impact</h2>
                <ul style={{ color: '#57534E', lineHeight: 1.8, paddingLeft: '20px' }}>
                  <li>1.5 Lakh+ animals rescued and treated</li>
                  <li>43+ ambulances and clinics operational</li>
                  <li>75+ veterinarians and paravets on ground</li>
                  <li>100+ cases treated daily</li>
                  <li>100% free care for every animal</li>
                </ul>
              </section>

              <nav style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 12px' }}>Pages</h2>
                <ul style={{ color: '#57534E', lineHeight: 1.8, paddingLeft: '20px' }}>
                  <li><a href="/" style={{ color: '#B8650A' }}>Home — Find Nearest Ambulance</a></li>
                  <li><a href="/live-impact" style={{ color: '#B8650A' }}>Live Impact — Rescue Case Tracker</a></li>
                  <li><a href="/privacy-policy" style={{ color: '#B8650A' }}>Privacy Policy</a></li>
                  <li><a href="/terms-conditions" style={{ color: '#B8650A' }}>Terms &amp; Conditions</a></li>
                  <li><a href="/refund-cancellation" style={{ color: '#B8650A' }}>Refund &amp; Cancellation Policy</a></li>
                </ul>
              </nav>
            </main>

            <footer style={{ borderTop: '1px solid #E8E0D8', paddingTop: '20px', textAlign: 'center', color: '#78716C', fontSize: '13px' }}>
              <p>&copy; 2026 Arham Yuva Seva Group. All rights reserved. | 80G Tax Exemption Available</p>
            </footer>
          </div>
        </noscript>
      </body>
    </Html>
  );
}
