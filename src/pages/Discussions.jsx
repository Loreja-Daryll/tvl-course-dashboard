import { Search, MessageSquare, Plus } from 'lucide-react';
import { PageHeading } from '../components/shared';
import { discussionThreads } from '../data/courseData';

function ThreadCard({ thread }) {
  return (
    <button
      type="button"
      className="flex w-full items-start gap-4 border-t border-charcoal-border/70 px-4 py-5 text-left first:border-t-0 transition-colors hover:bg-charcoal-soft/60 sm:px-6"
    >
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold-500/40 font-serif text-xs text-gold-300">
        {thread.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-sm font-medium text-cream">{thread.title}</p>
          <span className="flex-none text-[11px] text-cream/35">{thread.time}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-cream/45">{thread.excerpt}</p>
        <div className="mt-2.5 flex items-center gap-3">
          <span className="text-[11px] text-cream/40">{thread.author}</span>
          <span className="h-1 w-1 rounded-full bg-cream/20" />
          <span className="rounded-full border border-charcoal-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-gold-500">
            {thread.tag}
          </span>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-cream/40">
            <MessageSquare size={12} />
            {thread.replies}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function Discussions() {
  return (
    <div>
      <PageHeading
        eyebrow="Community"
        title="Discussions"
        subtitle="Ask questions, share wins, and learn from other VAs in the program."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-charcoal-border bg-charcoal-soft px-4 py-2.5">
          <Search size={15} className="text-cream/35" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full bg-transparent text-sm text-cream placeholder:text-cream/35 focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="flex flex-none items-center justify-center gap-2 rounded-full border border-gold-500 px-5 py-2.5 text-sm font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-charcoal"
        >
          <Plus size={15} />
          Start a Discussion
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-card">
        {discussionThreads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}
