import { supabase } from './client';

export interface DbProperty {
  id: string;
  title: string;
  price: number;
  price_suffix: string | null;
  location: string;
  beds: number;
  baths: number;
  area: string;
  image_url: string;
  tag: string | null;
  type: 'sale' | 'rent';
  is_featured: boolean;
  created_at: string;
}

export interface GetPropertiesOptions {
  page?: number;
  pageSize?: number;
  type?: 'sale' | 'rent' | 'all';
  featured?: boolean;
}

export interface PaginatedProperties {
  data: DbProperty[];
  count: number;
  totalPages: number;
  currentPage: number;
}

export async function getProperties({
  page = 1,
  pageSize = 8,
  type = 'all',
  featured,
}: GetPropertiesOptions = {}): Promise<PaginatedProperties> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: true });

  if (featured !== undefined) {
    query = query.eq('is_featured', featured);
  }

  if (type !== 'all') {
    query = query.eq('type', type);
  }

  // Only apply range for non-featured (paginated) queries
  if (featured !== true) {
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Supabase error fetching properties:', error.message);
    return { data: [], count: 0, totalPages: 0, currentPage: page };
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: data ?? [],
    count: total,
    totalPages,
    currentPage: page,
  };
}
