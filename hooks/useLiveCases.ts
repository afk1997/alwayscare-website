import { useState, useEffect } from 'react';
import { LiveCase } from '../types';

interface UseLiveCasesResult {
  cases: LiveCase[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useLiveCases(limit?: number): UseLiveCasesResult {
  const [cases, setCases] = useState<LiveCase[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = () => {
    setLoading(true);
    setError(null);
    fetch('/api/live-cases')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: any[]) => {
        const allCases: LiveCase[] = [];
        data.forEach((site: any) => {
          if (site.cases && Array.isArray(site.cases)) {
            site.cases.forEach((c: any) => {
              allCases.push({
                id: c.id,
                caseId: c.caseId,
                caseDate: c.caseDate,
                animalType: c.animalType || 'Unknown',
                address: c.address || null,
                informerName: c.informerName || null,
                status: c.status || 'PENDING',
                caseType: c.caseType || null,
                condition: c.condition || 'NORMAL',
                doctorObservation: c.doctorObservation || null,
                affectedBodyPart: c.affectedBodyPart || null,
                treatmentGiven: c.treatmentGiven || null,
                medicationDosage: c.medicationDosage || null,
                recommendation: c.recommendation || null,
                preTreatmentPhoto: c.preTreatmentPhoto || null,
                postTreatmentPhotosAndVideosFolderURL: c.postTreatmentPhotosAndVideosFolderURL || null,
                createdAt: c.createdAt || null,
                siteName: site.siteName || 'Unknown',
              });
            });
          }
        });
        allCases.sort((a, b) => new Date(b.caseDate).getTime() - new Date(a.caseDate).getTime());
        setTotalCount(allCases.length);
        setCases(limit ? allCases.slice(0, limit) : allCases);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => { fetchCases(); }, []);

  return { cases, totalCount, loading, error, retry: fetchCases };
}
