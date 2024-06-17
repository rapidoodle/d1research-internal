'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="d-flex flex-column vh-100-mobile p-3 bg-light border-right">
      {/* <Link href="/">MyApp</Link> */}
      <h6 className="py-3 sidebar-heading d-flex justify-content-between align-items-center mb-1 text-muted">
        <span>D1RESEARCH</span>
      </h6>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <Link href="/dashboard" className={clsx(
                'nav-link',
                {
                'active': pathname === '/dashboard',
                },
            )}>
            Masters
            </Link>
        </li>
        <li className="nav-item">
            <Link href="/dashboard/events" className={clsx(
                'nav-link',
                {
                'active': pathname === '/dashboard/events',
                },
            )}>
            Events
            </Link>
        </li>
        <li className="nav-item">
            <Link href="/dashboard/settings" className={clsx(
                'nav-link',
                {
                'active': pathname === '/dashboard/settings',
                },
            )}>
            Settings
            </Link>
        </li>
        </ul>
    </div>
  );
};

export default SideNav;
