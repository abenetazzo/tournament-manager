"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function ApiStatusPage() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: HealthResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError((err as Error).message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Tournament Manager – API status
        </h1>

        {loading && (
          <p className="text-center text-slate-300">
            Verifica connessione API...
          </p>
        )}

        {!loading && error && (
          <p className="text-center text-red-400">
            Errore nel contattare l&apos;API: {error}
          </p>
        )}

        {!loading && data && (
          <div className="space-y-2">
            <p className="text-center">
              Stato API:{" "}
              <span className="font-semibold text-emerald-400">
                {data.status}
              </span>
            </p>
            <p className="text-center text-sm text-slate-300">
              Servizio: {data.service}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
