"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  fetchInvestmentCatalog,
  fetchPortfolioState,
} from "@/lib/portfolio/actions";
import { buildCatalogIndex } from "@/lib/portfolio/catalog";
import type { CatalogInvestment, PortfolioState } from "@/lib/portfolio/types";

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
  signOut: () => Promise<void>;
}

const ParticipateContext = createContext<ParticipateContextValue | null>(null);

export function ParticipateProvider({ children }: { children: ReactNode }) {
  const isConfigured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioState | null>(null);
  const [catalog, setCatalog] = useState<CatalogInvestment[]>([]);
  const [isLoading, setIsLoading] = useState(isConfigured);
  const [signInOpen, setSignInOpen] = useState(false);

  const catalogIndex = useMemo(() => buildCatalogIndex(catalog), [catalog]);

  const refreshPortfolio = useCallback(async () => {
    if (!isConfigured) {
      setPortfolio(null);
      return;
    }

    const next = await fetchPortfolioState();
    setPortfolio(next);
  }, [isConfigured]);

  useEffect(() => {
    if (!isConfigured) {
      return;
    }

    let cancelled = false;

    async function bootstrap() {
      setIsLoading(true);
      const supabase = createClient();
      const [{ data: sessionData }, catalogRows] = await Promise.all([
        supabase.auth.getSession(),
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

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
  }, [isConfigured, refreshPortfolio]);

  const signOut = useCallback(async () => {
    if (!isConfigured) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    setPortfolio(null);
    setUser(null);
  }, [isConfigured]);

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
    signOut,
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
