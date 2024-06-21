'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { signOutAttempt } from '../lib/login';

const SideNav = () => {
  const pathname = usePathname();
  const [settingsCollapsed, setSettingsCollapsed] = useState(true);
  const toggleSettings = () => {
    setSettingsCollapsed(!settingsCollapsed);
  };

  const handleSignOut = async () => {
    try {
      await signOutAttempt();
      console.log('Sign out: ');
    } catch (error) {
      console.log( error );
    }
  };

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
            Master
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
          <button 
            className="nav-link btn btn-link text-start"
            onClick={toggleSettings}
            aria-expanded={!settingsCollapsed}
          >
            Settings
          </button>
          <div className={clsx('collapse', { 'show': !settingsCollapsed })}>
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link href="/dashboard/settings/companies" className={clsx('nav-link', { 'active': pathname === '/dashboard/settings/companies' })}>
                  Company
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard/settings/users" className={clsx('nav-link', { 'active': pathname === '/dashboard/settings/users' })}>
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item mt-0 mt-sm-5">        
          <p className='nav-link' onClick={handleSignOut}> Sign out</p>
        </li>
        </ul>
    </div>
  );
};

export default SideNav;
