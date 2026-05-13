"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface DebouncedCachedSearchOptions<T> {
  query: string;
  items: readonly T[];
  filter: (item: T, normalizedQuery: string) => boolean;
  delay?: number;
  cacheNamespace?: string;
}

export function useDebouncedCachedSearch<T>({
  query,
  items,
  filter,
  delay = 300,
  cacheNamespace = "default",
}: DebouncedCachedSearchOptions<T>) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const cacheRef = useRef<Map<string, T[]>>(new Map());

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, query]);

  const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase("es-ES");
  const isSearching = query !== debouncedQuery;

  const results = useMemo(() => {
    const cacheKey = `${cacheNamespace}:${normalizedQuery}`;
    const cachedResults = cacheRef.current.get(cacheKey);

    if (cachedResults) return cachedResults;

    const nextResults = normalizedQuery
      ? items.filter((item) => filter(item, normalizedQuery))
      : items;

    cacheRef.current.set(cacheKey, nextResults);
    return nextResults;
  }, [cacheNamespace, filter, items, normalizedQuery]);

  return {
    debouncedQuery,
    normalizedQuery,
    results,
    isSearching,
  };
}
