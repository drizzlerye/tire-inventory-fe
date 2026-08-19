import { DateTime } from 'luxon';

export type InventoryItem = {
  brand: string;
  model: string;
  tire_size: string;
  load_index: number;
  speed_rating: string;
  on_hand: number;
  reorder_level: number;
  needs_reorder: boolean;
};

export type TireBrand = {
  name: string;
  created_at: DateTime;
  display_name: string;
};

type InventoryResponse = {
  response: InventoryItem[];
};

type TireBrandResponse = {
  response: TireBrand[];
};

const TIRE_SERVICE_BASE_URL =
  process.env.EXPO_PUBLIC_TIRE_SERVICE_ENDPOINT ?? 'http://localhost:3001';

/**
 * A larger inventory query for returning not only on_hand counts
 * but also wide varieties of information about each type of tire
 * @returns
 */
export async function getInventory(): Promise<InventoryItem[]> {
  const response = await fetch(`${TIRE_SERVICE_BASE_URL}/get-tire-inventory`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Inventory request failed with status ${response.status}.`);
  }

  const data: InventoryResponse = await response.json();

  return data.response;
}

/**
 * A basic level tire brand query for finding out which brands of tire
 * the company currently cares about
 * @returns
 */
export async function getTireBrands(): Promise<TireBrand[]> {
  const response = await fetch(`${TIRE_SERVICE_BASE_URL}/get-tire-brands`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Inventory request failed with status ${response.status}.`);
  }

  const data: TireBrandResponse = await response.json();

  return data.response;
}
