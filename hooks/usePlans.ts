import { useState, useEffect } from 'react';

export interface RazorpayPlan {
  id: string;
  period: string;
  interval: number;
  item: {
    id: string;
    name: string;
    description: string | null;
    amount: number;
    currency: string;
  };
}

const periodLabels: Record<string, string> = {
  daily: 'day',
  weekly: 'week',
  monthly: 'month',
  yearly: 'year',
};

const monthlyMultipliers: Record<string, number> = {
  daily: 30,
  weekly: 4,
  monthly: 1,
  yearly: 1 / 12,
};

export function getPlanDisplay(plan: RazorpayPlan) {
  const amountRupees = plan.item.amount / 100;
  const label = periodLabels[plan.period] || plan.period;
  const perPeriod = `₹${Math.round(amountRupees / plan.interval)}/${label}`;
  const multiplier = monthlyMultipliers[plan.period] ?? 1;
  const monthly = Math.round((amountRupees * multiplier) / plan.interval);
  const perMonth = `₹${monthly}/month`;
  return { perPeriod, perMonth, monthly };
}

interface UsePlansResult {
  plans: RazorpayPlan[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function usePlans(): UsePlansResult {
  const [plans, setPlans] = useState<RazorpayPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = () => {
    setLoading(true);
    setError(null);
    const baseUrl = process.env.NEXT_PUBLIC_PLANS_API_BASE_URL || 'http://localhost:3001';
    fetch(`${baseUrl}/api/plans`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch plans');
        return res.json();
      })
      .then((data: RazorpayPlan[]) => {
        setPlans(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => { fetchPlans(); }, []);

  return { plans, loading, error, retry: fetchPlans };
}
