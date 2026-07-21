import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({
  items,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-sm sm:px-6">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div
              key={item.label}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate-500 transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-900">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight
                  size={16}
                  className="text-slate-400"
                />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}