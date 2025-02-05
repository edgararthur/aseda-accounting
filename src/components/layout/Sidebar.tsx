import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'General Ledger',
    icon: BookOpen,
    children: [
      { name: 'Chart of Accounts', href: '/ledger/chart-of-accounts' },
      { name: 'Journal Entries', href: '/ledger/journal-entries' },
      { name: 'Trial Balance', href: '/ledger/trial-balance' },
    ],
  },
  {
    name: 'Receivables',
    icon: Receipt,
    children: [
      { name: 'Customers', href: '/receivables/customers' },
      { name: 'Invoices', href: '/receivables/invoices' },
      { name: 'Collections', href: '/receivables/collections' },
    ],
  },
  {
    name: 'Payables',
    icon: CreditCard,
    children: [
      { name: 'Vendors', href: '/payables/vendors' },
      { name: 'Bills', href: '/payables/bills' },
      { name: 'Payments', href: '/payables/payments' },
    ],
  },
  {
    name: 'Tax Management',
    icon: Building2,
    children: [
      { name: 'Tax Returns', href: '/tax/returns' },
      { name: 'Tax Payments', href: '/tax/payments' },
    ],
  },
  {
    name: 'Banking',
    href: '/banking',
    icon: Building2,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <div className="w-36 border-r bg-card">
      <ScrollArea className="h-full py-6">
        <nav className="space-y-1 px-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.href ? (
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                    )
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              ) : (
                <>
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                  <div className="ml-8 space-y-1">
                    {item.children?.map((child) => (
                      <NavLink
                        key={child.name}
                        to={child.href}
                        className={({ isActive }) =>
                          cn(
                            'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                            isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                          )
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}