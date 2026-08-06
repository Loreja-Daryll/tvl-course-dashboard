import { NavLink } from 'react-router-dom';
import { navItems } from './Sidebar';

export default function MobileTabBar() {
  const tabs = navItems.slice(0, 5);
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-charcoal-border bg-charcoal/95 backdrop-blur lg:hidden">
      {tabs.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] tracking-wide ${
                isActive ? 'text-gold-400' : 'text-cream/40'
              }`
            }
          >
            <Icon size={18} />
            {item.label.toUpperCase()}
          </NavLink>
        );
      })}
    </nav>
  );
}
