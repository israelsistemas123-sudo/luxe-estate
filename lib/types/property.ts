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
}
