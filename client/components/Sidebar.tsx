'use client';

import { RiLogoutCircleLine } from 'react-icons/ri';
import { UserCog } from 'lucide-react';
import { GiGoat } from 'react-icons/gi';
import { cn } from '@/lib/utils';
import { useSidebarExpandable } from '@/app/contexts/SidebarExpandableContext';
import { sidebarContent } from '@/app/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { forwardRef } from 'react';

const Sidebar = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const pathname = usePathname();
  const { isExpanded } = useSidebarExpandable();

  return (
    <aside
      className='sidebar p-4 border-r border-gray-100 h-full flex flex-col bg-white '
      ref={ref}>
      <nav className='flex-1 flex flex-col'>
        {/* Header */}
        <header className='mb-8'>
          <Link
            href='/'
            className='flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
            <GiGoat size={28} className='text-indigo-600' />
            {isExpanded && (
              <span className='text-xl font-semibold ml-3 text-gray-800'>
                Ewure
              </span>
            )}
          </Link>
        </header>

        {/* Main Navigation */}
        <ul className='space-y-1 flex-1'>
          {sidebarContent.map(({ id, label, Icon, url }) => {
            const isActive = pathname === url;
            return (
              <li key={id}>
                <Link
                  href={url}
                  className={cn(
                    'flex items-center p-3 rounded-lg transition-all duration-200 capitalize',
                    'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50',
                    isActive && 'bg-indigo-50 text-indigo-600 font-medium',
                    !isExpanded && 'justify-center'
                  )}>
                  <Icon size={20} />
                  {isExpanded && (
                    <span className='ml-3 text-[15px]'>{label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <footer className='mt-auto'>
          <ul className='space-y-1'>
            <li>
              <Link
                href='/account-settings'
                className={cn(
                  'flex items-center p-3 rounded-lg transition-all duration-200',
                  'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50',
                  !isExpanded && 'justify-center',

                  pathname === '/account-settings' &&
                    'bg-indigo-50 text-indigo-600 font-medium'
                )}>
                <UserCog size={20} />
                {isExpanded && (
                  <span className='ml-3 text-[15px]'>Account Settings</span>
                )}
              </Link>
            </li>

            <li>
              <Link
                href='/login'
                className={cn(
                  'flex items-center p-3 rounded-lg transition-all duration-200 text-gray-600 hover:text-red-600 hover:bg-red-50',
                  !isExpanded && 'justify-center'
                )}>
                <RiLogoutCircleLine size={20} className='text-red-500' />
                {isExpanded && <span className='ml-3 text-[15px]'>Logout</span>}
              </Link>
            </li>
          </ul>
        </footer>
      </nav>
    </aside>
  );
});

Sidebar.displayName = 'sidebar';
export default Sidebar;
