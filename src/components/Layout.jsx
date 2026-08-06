import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileTabBar from './MobileTabBar';
import Header from './Header';

export default function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-charcoal text-cream">
      <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenMobileNav={() => setMobileNavOpen(true)} />

        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-10 lg:pb-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileTabBar />
    </div>
  );
}
