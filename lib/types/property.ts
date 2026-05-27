export interface Property {
  id: string;
  title: string;
  price: string;
  priceSuffix?: string;
  location: string;
  beds: number | string;
  baths: number | string;
  area: string;
  imageUrl: string;
  tag?: string;
  type: 'sale' | 'rent';
  /** Whether this property is highlighted in the Featured Collections section */
  isFeatured: boolean;
}
