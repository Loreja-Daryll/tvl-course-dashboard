import { useMemo, useState } from 'react';
import { Search, MessageSquare, Plus, Pin, Users, Flame } from 'lucide-react';
import { PageHeading } from '../components/shared';
import { discussionThreads } from '../data/courseData';

function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-charcoal-border bg-charcoal-card px-4 py-3">
      <Icon size={15} className="text-gold-500" />
      <div>
        <p className="font-serif text-base leading-none text-cream">{value}</p>
        <p className="mt-1 text-[10px] uppercase tracking-wide text-cream/40">{label}</p>
      </div>
    </div>
  );
}

function ThreadCard({ thread, index }) {
  const isAnnouncement = thread.tag === 'Announcement';

  return (
    <button
      type="button"
      style={{ animationDelay: `${index * 60}ms` }}
      className={`animate-fade-up group relative flex w-full items-start gap-4 border-t border-charcoal-border/70 px-4 py-5 text-left transition-all duration-200 first:border-t-0 hover:bg-charcoal-soft/60 sm:px-6 ${
        isAnnouncement ? 'bg-gold-500/[0.03]' : ''
      }`}
    >
      {isAnnouncement && <span className="absolute inset-y-0 left-0 w-0.5 bg-gold-500" />}

      <div
        className={`flex h-10 w-10 flex-none items-center justify-center rounded-full font-serif text-xs transition-transform duration-200 group-hover:scale-105 ${
          isAnnouncement
            ? 'bg-gradient-to-br from-gold-300 to-gold-500 text-charcoal'
            : 'border border-gold-500/40 text-gold-300'
        }`}
      >
        {thread.initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {isAnnouncement && <Pin size={12} className="flex-none text-gold-400" />}
          <p className="truncate text-sm font-medium text-cream">{thread.title}</p>
          <span className="ml-auto flex-none text-[11px] text-cream/35">{thread.time}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-cream/45">{thread.excerpt}</p>
        <div className="mt-2.5 flex items-center gap-3">
          <span className="text-[11px] text-cream/40">{thread.author}</span>
          <span className="h-1 w-1 rounded-full bg-cream/20" />
          <span className="rounded-full border border-charcoal-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-gold-500">
            {thread.tag}
          </span>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-cream/40 transition-colors group-hover:text-gold-300">
            <MessageSquare size={12} />
            {thread.replies}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function Discussions() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = useMemo(
    () => ['All', ...new Set(discussionThreads.map((t) => t.tag))],
    []
  );

  const totalReplies = useMemo(
    () => discussionThreads.reduce((sum, t) => sum + t.replies, 0),
    []
  );

  const filtered = useMemo(() => {
    return discussionThreads
      .filter((t) => activeTag === 'All' || t.tag === activeTag)
      .filter((t) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return t.title.toLowerCase().includes(q) || t.excerpt.toLowerCase().includes(q);
      })
      // Pinned announcements always float to the top
      .sort((a, b) => (b.tag === 'Announcement') - (a.tag === 'Announcement'));
  }, [query, activeTag]);

  return (
    <div>
      <PageHeading
        eyebrow="Community"
        title="Discussions"
        subtitle="Ask questions, share wins, and learn from other VAs in the program."
      />

      {/* STATS */}
      <div className="mb-8 grid grid-cols-3 gap-3 sm:max-w-md">
        <StatChip icon={MessageSquare} label="Threads" value={discussionThreads.length} />
        <StatChip icon={Users} label="Replies" value={totalReplies} />
        <StatChip icon={Flame} label="Active Today" value={2} />
      </div>

      {/* SEARCH + NEW THREAD */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-charcoal-border bg-charcoal-soft px-4 py-2.5 transition-colors focus-within:border-gold-500/50">
          <Search size={15} className="text-cream/35" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full bg-transparent text-sm text-cream placeholder:text-cream/35 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="group flex flex-none items-center justify-center gap-2 rounded-full border border-gold-500 px-5 py-2.5 text-sm font-semibold text-gold-300 transition-all duration-200 hover:bg-gold-500 hover:text-charcoal hover:shadow-lg hover:shadow-gold-500/20"
        >
          <Plus size={15} className="transition-transform duration-200 group-hover:rotate-90" />
          Start a Discussion
        </button>
      </div>

      {/* FILTER PILLS */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeTag === tag
                ? 'border-gold-500 bg-gold-500 text-charcoal'
                : 'border-charcoal-border text-cream/50 hover:border-gold-500/40 hover:text-gold-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* THREAD LIST */}
      {filtered.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-card">
          {filtered.map((thread, i) => (
            <ThreadCard key={thread.id} thread={thread} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-charcoal-border bg-charcoal-card px-6 py-16 text-center">
          <p className="text-sm text-cream/50">No discussions match your search.</p>
        </div>
      )}
    </div>
  );
}
