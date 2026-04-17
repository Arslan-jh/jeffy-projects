"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";

interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

interface BlogContentProps {
  initialPosts: Post[];
}

const POSTS_PER_PAGE = 8;

export default function BlogContent({ initialPosts }: BlogContentProps) {
  const [posts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique tags with counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  // Extract unique years
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    posts.forEach(post => {
      yearSet.add(new Date(post.date).getFullYear().toString());
    });
    return Array.from(yearSet).sort((a, b) => Number(b) - Number(a));
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(p => p.tags.includes(selectedTag));
    }

    if (selectedYear) {
      filtered = filtered.filter(p =>
        new Date(p.date).getFullYear().toString() === selectedYear
      );
    }

    return filtered;
  }, [posts, searchQuery, selectedTag, selectedYear]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset page when filters change
  const handleFilterChange = useCallback((search: string, tag: string | null, year: string | null) => {
    setSearchQuery(search);
    setSelectedTag(tag);
    setSelectedYear(year);
    setCurrentPage(1);
  }, []);

  // Handlers
  const handleSearch = (value: string) => {
    handleFilterChange(value, selectedTag, selectedYear);
  };

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    handleFilterChange(searchQuery, newTag, selectedYear);
  };

  const handleYearChange = (year: string) => {
    const newYear = selectedYear === year ? null : year;
    handleFilterChange(searchQuery, selectedTag, newYear);
  };

  const clearFilters = () => {
    handleFilterChange("", null, null);
  };

  const hasFilters = searchQuery || selectedTag || selectedYear;

  return (
    <>
      {/* Header */}
      <section className="section-light pt-20 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Blog
          </h1>
          <p
            className="text-[17px] text-black/60 mb-6 max-w-lg"
            style={{ fontFamily: "var(--font-text)", letterSpacing: "-0.374px", lineHeight: 1.47 }}
          >
            Thoughts on technology, design, and everything in between.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-56 h-9 bg-[#fafafc] rounded-[11px] border-[3px] border-black/[0.04] px-4 pr-8 text-[14px] text-black/80 placeholder:text-black/30 focus:outline-none focus:border-black/10 transition-colors"
                style={{ fontFamily: "var(--font-text)", letterSpacing: "-0.224px" }}
              />
              {searchQuery ? (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-black/30 hover:text-black/60 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black/30 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>

            {/* Tags */}
            {tagCounts.length > 0 && (
              <div className="flex gap-1.5">
                {tagCounts.map(({ tag, count }) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`h-9 px-4 rounded-[11px] text-[14px] transition-all ${
                      selectedTag === tag
                        ? "bg-black text-white"
                        : "bg-[#fafafc] text-black/70 border-[3px] border-black/[0.04] hover:border-black/10"
                    }`}
                    style={{ fontFamily: "var(--font-text)", letterSpacing: "-0.224px" }}
                  >
                    {tag}
                    <span className={`ml-1 ${selectedTag === tag ? "text-white/60" : "text-black/40"}`}>
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Years */}
            {years.length > 1 && (
              <div className="flex gap-1">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`h-9 px-4 rounded-[11px] text-[14px] transition-all ${
                      selectedYear === year
                        ? "bg-black text-white"
                        : "bg-[#fafafc] text-black/70 border-[3px] border-black/[0.04] hover:border-black/10"
                    }`}
                    style={{ fontFamily: "var(--font-text)", letterSpacing: "-0.224px" }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="h-9 px-4 text-[14px] text-black/40 hover:text-black/70 transition-colors"
                style={{ fontFamily: "var(--font-text)", letterSpacing: "-0.224px" }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section-white pb-16 px-6 mt-8">
        <div className="max-w-3xl mx-auto">
          {/* Posts list - Apple card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedPosts.length === 0 ? (
              <p className="text-[17px] text-black/50 py-16 text-center col-span-2" style={{ fontFamily: "var(--font-text)" }}>
                No articles found.
              </p>
            ) : (
              paginatedPosts.map((post, index) => {
                // Premium muted color palette
                const cardColors = [
                  { bg: "#faf8f5", text: "#1d1d1f" },  // Warm cream
                  { bg: "#f2f7f4", text: "#1d1d1f" },  // Soft sage
                  { bg: "#f5f4f7", text: "#1d1d1f" },  // Muted lavender
                  { bg: "#f7f5f3", text: "#1d1d1f" },  // Warm beige
                  { bg: "#f4f6f8", text: "#1d1d1f" },  // Soft blue-gray
                  { bg: "#f9f7f5", text: "#1d1d1f" },  // Light stone
                  { bg: "#e8f4f8", text: "#1d1d1f" },  // Sky blue
                  { bg: "#fce8e8", text: "#1d1d1f" },  // Soft rose
                  { bg: "#e8f0e4", text: "#1d1d1f" },  // Sage green
                  { bg: "#f5f0e8", text: "#1d1d1f" },  // Warm sand
                  { bg: "#eae8f5", text: "#1d1d1f" },  // Soft violet
                  { bg: "#f0f5f5", text: "#1d1d1f" },  // Mist
                ];
                const color = cardColors[index % cardColors.length];
                // Random min height between 140px and 200px
                const minHeight = 140 + (index % 3) * 30;

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block group"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="rounded-[16px] p-6 transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1"
                      style={{
                        backgroundColor: color.bg,
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                        minHeight: `${minHeight}px`,
                      }}
                    >
                      <div className="flex flex-col">
                        {/* Title */}
                        <h2
                          className="font-semibold mb-4 group-hover:opacity-80 transition-opacity"
                          style={{ fontFamily: "var(--font-display)", fontSize: "20px", letterSpacing: "0.231px", lineHeight: 1.19, color: color.text }}
                        >
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-[14px] leading-relaxed mb-4 line-clamp-3 flex-1" style={{ fontFamily: "var(--font-text)", letterSpacing: "-0.224px", lineHeight: 1.5, color: "#1d1d1fb3" }}>
                            {post.excerpt}
                          </p>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 2).map((tag: string) => (
                              <span
                                key={tag}
                                className="text-[11px] px-2.5 py-0.5 rounded-full bg-black/5 text-black/50"
                                style={{ fontFamily: "var(--font-text)" }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-[12px] text-black/40" style={{ fontFamily: "var(--font-text)", letterSpacing: "-0.12px" }}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-[#fafafc] text-black/70 hover:bg-[#f0f0f0] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                style={{ fontFamily: "var(--font-text)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 flex items-center justify-center rounded-full text-[14px] transition-all ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "bg-[#fafafc] text-black/70 hover:bg-[#f0f0f0]"
                  }`}
                  style={{ fontFamily: "var(--font-text)" }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-[#fafafc] text-black/70 hover:bg-[#f0f0f0] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                style={{ fontFamily: "var(--font-text)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
