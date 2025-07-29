'use client';

import Notifications from '@/components/Notifications';
import SidebarTrigger from '@/components/SidebarTrigger';
import User from './User';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  return (
    <header className='flex items-center justify-between p-6 px-10 border-b border-gray-300'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger />
        <span className='text-lg font-semibold text-gray-700 tracking-wide capitalize'>
          {pathname.replace('/', '')}
        </span>
      </div>
      <div className='flex items-center gap-4'>
        <Notifications />
        <User />
      </div>
    </header>
  );
};

export default Header;
