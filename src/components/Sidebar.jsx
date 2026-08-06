import { NavLink } from 'react-router-dom';
import { Home, BookOpen, MessageSquare, BarChart3, Settings, LogOut, X } from 'lucide-react';

export const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'My Courses', icon: BookOpen, path: '/my-courses' },
  { label: 'Discussions', icon: MessageSquare, path: '/discussions' },
  { label: 'Progress', icon: BarChart3, path: '/progress' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onCloseMobile} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-none flex-col border-r border-charcoal-border bg-charcoal transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-7">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500 font-serif text-sm text-gold-300">
              TVL
            </div>
            <span className="font-serif text-sm tracking-wide text-cream/80">The VA Library</span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="text-cream/50 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-gold-500/10 text-gold-300'
                      : 'text-cream/55 hover:bg-charcoal-soft hover:text-cream/90'
                  }`
                }
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 pb-6">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream/45 transition-colors hover:bg-charcoal-soft hover:text-cream/80"
          >
            <LogOut size={17} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
