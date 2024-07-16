'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarAlt, faCaretDown, faCaretRight, faCashRegister, faChartArea, faChartBar, faChartColumn, faChevronDown, faChevronRight, faCogs, faFileExcel, faUsers } from '@fortawesome/free-solid-svg-icons';
import SideNavLink from './SideNavLink';

const SideNav = () => {
  const pathname = usePathname();
  const [settingsCollapsed, setSettingsCollapsed] = useState(true);
  const [eventsCollapsed, setEventsCollapsed] = useState(true);
  const [masterCollapsed, setMasterCollapsed] = useState(true);
  
  const toggleSettings = () => {
    setSettingsCollapsed(!settingsCollapsed);
  };
  const toggleEvents = () => {
    setEventsCollapsed(!eventsCollapsed);
  };
  const toggleMaster = () => {
    setMasterCollapsed(!masterCollapsed);
  };

  return (
    <div className="d-flex flex-column vh-100-mobile p-3 border-right">
      {/* <Link href="/">MyApp</Link> */}
      <h6 className="py-3 sidebar-heading d-flex justify-content-between align-items-center mb-1 text-muted">
        <span>D1RESEARCH</span>
      </h6>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link href="/" className={clsx('nav-link', { 'active': pathname === '/' })}>
            <FontAwesomeIcon icon={faFileExcel} /> Master file
          </Link>
        </li>
        <li className='nav-item'>
          <button 
            className="nav-link btn btn-link d-flex align-items-center w-100"
            onClick={toggleMaster}
            aria-expanded={!masterCollapsed}
          >
            <FontAwesomeIcon icon={faChartColumn} /> 
              <span className='ms-1'>Financial Overview</span> 
              <span className='ms-auto'><FontAwesomeIcon icon={masterCollapsed ? faChevronRight : faChevronDown} /></span>
          </button>
          <div className={clsx('collapse', { 'show': !masterCollapsed })}>
            <ul className="nav flex-column ms-3">
                <li className="nav-item">
                    <SideNavLink 
                      pathname={pathname} 
                      label={'Companies'} 
                      uniqueKeyType={'company_overview_key'}
                      path={'/financial-overview/companies'}
                    />
                </li>
                <li className="nav-item">
                  <SideNavLink 
                  pathname={pathname} 
                  label={'Estimates'} 
                  uniqueKeyType={'consolidated_estimates_key'}
                  path={'/financial-overview/consolidated-estimates'}
                />
              </li>
              <li className="nav-item">
                  <SideNavLink 
                  pathname={pathname} 
                  label={'Discounts'} 
                  uniqueKeyType={'annualized_discounts_key'}
                  path={'/financial-overview/annualized-discounts'}
                />
              </li>
            </ul>
          </div>

        </li>
        <li className="nav-item">
          <button 
            className="nav-link btn btn-link d-flex align-items-center w-100"
            onClick={toggleEvents}
            aria-expanded={!eventsCollapsed}
          >
            <FontAwesomeIcon icon={faCalendarAlt} /> 
              <span className='ms-1'>Events</span> 
              <span className='ms-auto'><FontAwesomeIcon icon={eventsCollapsed ? faChevronRight : faChevronDown} /></span>
          </button>
          <div className={clsx('collapse', { 'show': !eventsCollapsed })}>
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link href="/events/pending" className={clsx('nav-link', { 'active': pathname === '/events/pending' })}>
                 Pending
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/events/approved" className={clsx('nav-link', { 'active': pathname === '/events/approved' })}>
                  Approved
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/events/ignored" className={clsx('nav-link', { 'active': pathname === '/events/ignored' })}>
                  Ignored
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <button 
            className="nav-link btn btn-link d-flex align-items-center w-100"
            onClick={toggleSettings}
            aria-expanded={!settingsCollapsed}
          >
            <FontAwesomeIcon icon={faCogs} /> 
              <span className='ms-1'>Settings</span> 
              <span className='ms-auto'><FontAwesomeIcon icon={settingsCollapsed ? faChevronRight : faChevronDown} /></span>
          </button>
          <div className={clsx('collapse', { 'show': !settingsCollapsed })}>
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <Link href="/settings/companies" className={clsx('nav-link', { 'active': pathname === '/settings/companies' })}>
                 Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/settings/users" className={clsx('nav-link', { 'active': pathname === '/settings/users' })}>
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item mt-0 mt-md-5 d-block d-md-none">        
          <p className='nav-link cursor-pointer' onClick={signOut}> Sign out</p>
        </li>
        </ul>
    </div>
  );
};

export default SideNav;
