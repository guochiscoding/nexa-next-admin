'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppProvider';
import { AppHeader } from '@/layouts/app/AppHeader';
import { FloatingSupport } from '@/layouts/app/FloatingSupport';
import { SideNavigation } from '@/layouts/app/SideNavigation';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { preferences } = useApp();
  const isTopLayout = preferences.layout === 'top';

  return (
    <div className="app-layout">
      <AppHeader collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <div className={`app-body ${collapsed ? 'is-collapsed' : ''} ${isTopLayout ? 'is-top-layout' : ''}`}>
        {!isTopLayout ? <aside className="app-sider"><SideNavigation collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} /></aside> : null}
        <main className="app-content"><div className="app-content-stack">{children}<FloatingSupport /></div></main>
      </div>
    </div>
  );
}
