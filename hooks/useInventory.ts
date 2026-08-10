import { useCallback, useEffect, useRef, useState } from 'react';

import { getInventory, type InventoryItem } from '@/services/tireService';

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);
  const requestInProgress = useRef(false);

  const loadInventory = useCallback(async (refresh = false) => {
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
      const inventory = await getInventory();
      if (isMounted.current) {
        setItems(inventory);
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
    loadInventory();

    return () => {
      isMounted.current = false;
    };
  }, [loadInventory]);

  return {
    items,
    isLoading,
    isRefreshing,
    error,
    refresh: () => loadInventory(true),
    retry: () => loadInventory(),
  };
}
