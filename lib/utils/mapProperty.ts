import { DbProperty } from '../supabase/properties';
import { Property } from '../types/property';

/**
 * Maps a Supabase DB row (snake_case) to the front-end Property interface (camelCase).
 * Converts numeric price to formatted string to preserve the display format.
 */
export function mapDbPropertyToProperty(db: DbProperty): Property {
  return {
    id: db.id,
    title: db.title,
    price: formatPrice(db.price, db.price_suffix, db.type),
    priceSuffix: db.price_suffix ?? undefined,
    location: db.location,
    beds: db.beds,
    baths: db.baths,
    area: db.area,
    imageUrl: db.image_url,
    tag: db.tag ?? undefined,
    type: db.type,
  };
}

function formatPrice(
  price: number,
  priceSuffix: string | null,
  type: 'sale' | 'rent'
): string {
  if (type === 'rent') {
    // Rent prices are monthly amounts (smaller numbers)
    return `$${price.toLocaleString('en-US')}`;
  }
  // Sale prices are full property values
  return `$${price.toLocaleString('en-US')}`;
}
