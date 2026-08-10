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

type InventoryResponse = {
  response: InventoryItem[];
};

const TIRE_SERVICE_BASE_URL =
  process.env.EXPO_PUBLIC_TIRE_SERVICE_ENDPOINT ?? 'http://localhost:3001';

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
