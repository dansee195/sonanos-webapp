import Link from 'next/link';
import { Home, SquareKanban, Mail, LineChart, Settings, Workflow, Link as LinkIcon, BookOpen, Layers, Calendar, Contact, FormInput, Bot, Building2 } from 'lucide-react';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/funnels', label: 'Funnels', icon: Layers },
  { href: '/crm/contacts', label: 'CRM', icon: Contact },
  { href: '/calendar', label: 'Kalender', icon: Calendar },
  { href: '/forms', label: 'Formulare', icon: FormInput },
  { href: '/surveys', label: 'Umfragen', icon: SquareKanban },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/academy', label: 'Academy', icon: BookOpen },
  { href: '/automations', label: 'Automationen', icon: Workflow },
  { href: '/email', label: 'E-Mail', icon: Mail },
  { href: '/links', label: 'Links', icon: LinkIcon },
  { href: '/analytics', label: 'Analytics', icon: LineChart },
  { href: '/integrations', label: 'Integrationen', icon: Building2 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-white/10 bg-surface/80 backdrop-blur-xl md:block">
      <div className="px-3 py-4">
        <div className="px-3 py-2 text-sm text-text-dim">Navigation</div>
        <ul className="space-y-1">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="group flex items-center gap-3 rounded-xl px-3 py-2 text-text-dim hover:bg-white/5 hover:text-white">
                <n.icon className="h-4 w-4 text-text-dim group-hover:text-white" />
                <span>{n.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

