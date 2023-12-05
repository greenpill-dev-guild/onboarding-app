enum Good {
  SHIRT,
  HOODIE,
  HAT,
  DASHIKI,
  PANTS,
  BLANKET,
  POSTER,
  MARKER,
  CRAYON,
  PENCIL,
}

type Status = "packing" | "packed" | "shipping" | "delivered";

const printfulKey = process.env.PRINTFUL_API_KEY;
export interface Order {
  id: number;
  external_id: string; // Printful Order ID
  token_id: number; // Blockchain NFT Order ID
  token_address: string; // Blockchain NFT Order Address
  good: Good;
  status: Status;
  created: number;
  updated: number;
  recipient: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state_code: string;
    state_name: string;
    country_code: string;
    country_name: string;
    zip: string;
    email: string;
  };
}

export function createOrder(): Order {
  return {} as Order;
}

export function getUserOrders(userID: string): Order[] {
  return [];
}

export function getOrder(id: string): Order {
  return {} as Order;
}

export function updateOrder(): Order {
  return {} as Order;
}

export function deleteOrder(id: string): Order {
  return {} as Order;
}
