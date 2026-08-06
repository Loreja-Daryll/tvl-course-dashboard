import { Search, Bell, Menu } from 'lucide-react';
import { initialsFrom } from './shared';
import { student } from '../data/courseData';

export default function Header({ onOpenMobileNav }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-charcoal-border bg-charcoal/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-10">
      <button
        type="button"
        onClick={onOpenMobileNav}
        className="text-cream/70 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="hidden sm:block">
        <p className="text-[11px] uppercase tracking-widest text-gold-500">Welcome back,</p>
        <p className="font-serif text-lg text-cream">{student.name}</p>
      </div>

      <div className="ml-auto flex flex-1 items-center gap-3 sm:max-w-xs lg:max-w-sm">
        <div className="flex w-full items-center gap-2 rounded-full border border-charcoal-border bg-charcoal-soft px-4 py-2">
          <Search size={15} className="text-cream/35" />
          <input
            type="text"
            placeholder="Search courses, lessons..."
            className="w-full bg-transparent text-sm text-cream placeholder:text-cream/35 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="button"
        className="relative flex-none text-cream/60 hover:text-gold-300"
        aria-label="Notifications"
      >
        <Bell size={19} />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold-500" />
      </button>

      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-2 border-gold-500 bg-charcoal-soft font-serif text-xs text-gold-300">
        {initialsFrom(student.name)}
      </div>
    </header>
  );
}
