import { useCallback, useEffect, useRef, useState } from 'react';

import { getTireBrands, type TireBrand } from '@/services/tireService';
export function useTires() {
  const [brands, setBrands] = useState<TireBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);
  const requestInProgress = useRef(false);

  const loadTireBrands = useCallback(async (refresh = false) => {
    if (requestInProgress.current) {
      return;
    }

    requestInProgress.current = true;
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const tireBrands = await getTireBrands();
      if (isMounted.current) {
        setBrands(tireBrands);
      }
    } catch (caughtError: unknown) {
      if (isMounted.current) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Inventory could not be loaded.'
        );
      }
    } finally {
      requestInProgress.current = false;
      if (isMounted.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadTireBrands();

    return () => {
      isMounted.current = false;
    };
  }, [loadTireBrands]);

  return {
    brands,
    isLoading,
    isRefreshing,
    error,
    refresh: () => loadTireBrands(true),
    retry: () => loadTireBrands(),
  };
}
