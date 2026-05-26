import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseHref?: string;
}

export function Pagination({ currentPage, totalPages, baseHref = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getPageHref = (page: number) => `${baseHref}/?page=${page}`;

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-12"
      aria-label="Property pagination"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={getPageHref(currentPage - 1)}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-nordic-dark/10 dark:border-white/10 bg-white dark:bg-white/5 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque dark:hover:text-primary transition-all"
          aria-label="Previous page"
        >
          <span className="material-icons text-sm">chevron_left</span>
        </Link>
      ) : (
        <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-nordic-dark/5 dark:border-white/5 bg-white/50 dark:bg-white/5 text-nordic-muted opacity-40 cursor-not-allowed">
          <span className="material-icons text-sm">chevron_left</span>
        </span>
      )}

      {/* Page numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return isActive ? (
          <span
            key={page}
            aria-current="page"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-mosque text-white font-semibold text-sm shadow-md"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={getPageHref(page)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-nordic-dark/10 dark:border-white/10 bg-white dark:bg-white/5 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque dark:hover:text-primary transition-all text-sm font-medium"
            aria-label={`Page ${page}`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getPageHref(currentPage + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-nordic-dark/10 dark:border-white/10 bg-white dark:bg-white/5 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque dark:hover:text-primary transition-all"
          aria-label="Next page"
        >
          <span className="material-icons text-sm">chevron_right</span>
        </Link>
      ) : (
        <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-nordic-dark/5 dark:border-white/5 bg-white/50 dark:bg-white/5 text-nordic-muted opacity-40 cursor-not-allowed">
          <span className="material-icons text-sm">chevron_right</span>
        </span>
      )}
    </nav>
  );
}
