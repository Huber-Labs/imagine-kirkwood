"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  fetchInvestmentCatalog,
  fetchPortfolioState,
  setInvestmentPoints,
} from "@/lib/portfolio/actions";
import { buildCatalogIndex, computePortfolioState } from "@/lib/portfolio/catalog";
import type { CatalogInvestment, PortfolioState } from "@/lib/portfolio/types";
import type { SupabasePublicConfig } from "@/lib/supabase/env";

type UpdateInvestmentPointsResult = { ok: true } | { ok: false; error: string };

interface ParticipateContextValue {
  isConfigured: boolean;
  user: User | null;
  portfolio: PortfolioState | null;
  catalog: CatalogInvestment[];
  catalogIndex: Map<string, CatalogInvestment>;
  isLoading: boolean;
  signInOpen: boolean;
  openSignIn: () => void;
  closeSignIn: () => void;
  refreshPortfolio: () => Promise<void>;
  updateInvestmentPoints: (
    investmentId: string,
    points: number,
  ) => Promise<UpdateInvestmentPointsResult>;
  signOut: () => Promise<void>;
  getSupabaseClient: () => SupabaseClient;
}

const ParticipateContext = createContext<ParticipateContextValue | null>(null);

interface ParticipateProviderProps {
  children: ReactNode;
  supabaseConfig: SupabasePublicConfig | null;
}

export function ParticipateProvider({
  children,
  supabaseConfig,
}: ParticipateProviderProps) {
  const isConfigured = supabaseConfig !== null;
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioState | null>(null);
  const [catalog, setCatalog] = useState<CatalogInvestment[]>([]);
  const [isLoading, setIsLoading] = useState(isConfigured);
  const [signInOpen, setSignInOpen] = useState(false);
  const writeQueuesRef = useRef(
    new Map<string, Promise<UpdateInvestmentPointsResult>>(),
  );

  const supabase = useMemo(
    () =>
      supabaseConfig ? createBrowserSupabaseClient(supabaseConfig) : null,
    [supabaseConfig],
  );

  const catalogIndex = useMemo(() => buildCatalogIndex(catalog), [catalog]);

  const getSupabaseClient = useCallback(() => {
    if (!supabase) {
      throw new Error("Supabase is not configured.");
    }
    return supabase;
  }, [supabase]);

  const refreshPortfolio = useCallback(async () => {
    if (!isConfigured) {
      setPortfolio(null);
      return;
    }

    const next = await fetchPortfolioState();
    setPortfolio(next);
  }, [isConfigured]);

  const updateInvestmentPoints = useCallback(
    async (
      investmentId: string,
      points: number,
    ): Promise<UpdateInvestmentPointsResult> => {
      if (!isConfigured) {
        return { ok: false, error: "Participation is not configured yet." };
      }

      setPortfolio((previous) => {
        if (!previous) return previous;

        const without = previous.allocations.filter(
          (row) => row.investmentId !== investmentId,
        );
        const nextAllocations =
          points === 0
            ? without
            : [...without, { investmentId, points }];

        return {
          ...previous,
          ...computePortfolioState(
            nextAllocations,
            previous.status,
            previous.participationOpen,
          ),
        };
      });

      const write = async (): Promise<UpdateInvestmentPointsResult> => {
        const result = await setInvestmentPoints(investmentId, points);
        if (!result.ok) {
          const next = await fetchPortfolioState();
          setPortfolio(next);
        }
        return result;
      };

      const previousWrite =
        writeQueuesRef.current.get(investmentId) ??
        Promise.resolve({ ok: true as const });
      const queued = previousWrite.then(write, write);
      writeQueuesRef.current.set(investmentId, queued);

      try {
        return await queued;
      } finally {
        if (writeQueuesRef.current.get(investmentId) === queued) {
          writeQueuesRef.current.delete(investmentId);
        }
      }
    },
    [isConfigured],
  );

  useEffect(() => {
    if (!isConfigured || !supabase) {
      return;
    }

    const client = supabase;
    let cancelled = false;

    async function bootstrap() {
      setIsLoading(true);
      const [{ data: sessionData }, catalogRows] = await Promise.all([
        client.auth.getSession(),
        fetchInvestmentCatalog(),
      ]);

      if (cancelled) return;

      setUser(sessionData.session?.user ?? null);
      setCatalog(catalogRows);

      if (sessionData.session?.user) {
        const nextPortfolio = await fetchPortfolioState();
        if (!cancelled) setPortfolio(nextPortfolio);
      } else {
        setPortfolio(null);
      }

      if (!cancelled) setIsLoading(false);
    }

    bootstrap();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await refreshPortfolio();
      } else {
        setPortfolio(null);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [isConfigured, refreshPortfolio, supabase]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setPortfolio(null);
    setUser(null);
  }, [supabase]);

  const value: ParticipateContextValue = {
    isConfigured,
    user,
    portfolio,
    catalog,
    catalogIndex,
    isLoading,
    signInOpen,
    openSignIn: () => setSignInOpen(true),
    closeSignIn: () => setSignInOpen(false),
    refreshPortfolio,
    updateInvestmentPoints,
    signOut,
    getSupabaseClient,
  };

  return (
    <ParticipateContext.Provider value={value}>
      {children}
    </ParticipateContext.Provider>
  );
}

export function useParticipate() {
  const context = useContext(ParticipateContext);
  if (!context) {
    throw new Error("useParticipate must be used within ParticipateProvider");
  }
  return context;
}

export function useOptionalParticipate() {
  return useContext(ParticipateContext);
}
