"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { MenuCategory } from "@/types";
import { menu, getActiveCategories } from "@/data/menu";
import { MenuCard } from "./MenuCard";
import { EmptyState } from "@/components/ui/States";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type DietFilter = "all" | "veg" | "nonveg";

export function MenuBrowser() {
  const searchParams = useSearchParams();
  const activeCategories = useMemo(() => getActiveCategories(), []);

  const initialCategory = useMemo<MenuCategory | "All">(() => {
    const c = searchParams.get("category");
    return c && activeCategories.includes(c as MenuCategory)
      ? (c as MenuCategory)
      : "All";
  }, [searchParams, activeCategories]);

  const [category, setCategory] = useState<MenuCategory | "All">(initialCategory);
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState<DietFilter>("all");
  const [bestsellerOnly, setBestsellerOnly] = useState(false);

  useEffect(() => {
    track("menu_view");
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (diet === "veg" && !item.vegetarian) return false;
      if (diet === "nonveg" && item.vegetarian) return false;
      if (bestsellerOnly && !item.bestseller) return false;
      if (q && !`${item.name} ${item.description}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [category, query, diet, bestsellerOnly]);

  // Group results by category, preserving display order.
  const grouped = useMemo(() => {
    const order = category === "All" ? activeCategories : [category];
    return order
      .map((cat) => ({
        category: cat,
        items: filtered.filter((i) => i.category === cat),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered, category, activeCategories]);

  const resetFilters = () => {
    setCategory("All");
    setQuery("");
    setDiet("all");
    setBestsellerOnly(false);
  };

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 -mx-1 bg-cream-50/95 py-3 backdrop-blur-md lg:top-20">
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes…"
              aria-label="Search the menu"
              className="w-full rounded-full border border-charcoal-200 bg-white py-3 pl-11 pr-4 text-sm text-charcoal-900 shadow-sm outline-none transition focus:border-maroon-400 focus:ring-2 focus:ring-maroon-200"
            />
          </div>

          {/* Diet + bestseller toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip active={diet === "all"} onClick={() => setDiet("all")}>
              All
            </FilterChip>
            <FilterChip active={diet === "veg"} onClick={() => setDiet("veg")}>
              <span className="inline-block h-2 w-2 rounded-full bg-green-600" /> Veg
            </FilterChip>
            <FilterChip active={diet === "nonveg"} onClick={() => setDiet("nonveg")}>
              <span className="inline-block h-2 w-2 rounded-full bg-maroon-700" /> Non-veg
            </FilterChip>
            <FilterChip
              active={bestsellerOnly}
              onClick={() => setBestsellerOnly((v) => !v)}
            >
              ★ Bestsellers
            </FilterChip>
          </div>

          {/* Category tabs */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <CategoryTab
              active={category === "All"}
              onClick={() => setCategory("All")}
            >
              All
            </CategoryTab>
            {activeCategories.map((cat) => (
              <CategoryTab
                key={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </CategoryTab>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6">
        {grouped.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No dishes found"
            description="Try a different search or clear your filters."
            actionLabel="Clear filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="space-y-12">
            {grouped.map((group) => (
              <section key={group.category} aria-labelledby={`cat-${group.category}`}>
                <h2
                  id={`cat-${group.category}`}
                  className="mb-5 font-display text-2xl font-bold text-charcoal-900"
                >
                  {group.category}
                  <span className="ml-2 text-sm font-normal text-charcoal-400">
                    ({group.items.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-maroon-700 bg-maroon-700 text-cream-50"
          : "border-charcoal-200 bg-white text-charcoal-600 hover:border-maroon-300"
      )}
    >
      {children}
    </button>
  );
}

function CategoryTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "bg-charcoal-900 text-cream-50"
          : "bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200"
      )}
    >
      {children}
    </button>
  );
}
