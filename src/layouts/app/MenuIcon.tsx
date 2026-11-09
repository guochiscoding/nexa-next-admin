import { AppWindow, BookOpen, Home, LayoutTemplate, Table2 } from 'lucide-react';

export function MenuIcon({ name }: { name?: string }) {
  if (name === 'data-table') return <Table2 className="menu-icon" />;
  if (name === 'project-intro') return <BookOpen className="menu-icon" />;
  if (name === 'page-templates') return <LayoutTemplate className="menu-icon" />;
  if (name === 'component-library') return <AppWindow className="menu-icon" />;
  return <Home className="menu-icon" />;
}
