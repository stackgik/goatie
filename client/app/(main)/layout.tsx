'use client';
import Header from '@/components/Header';
import { useSidebarExpandable } from '../contexts/SidebarExpandableContext';
import Sidebar from '@/components/Sidebar';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isExpanded } = useSidebarExpandable();
  const [sidebarWidth, setSidebarWidth] = useState<number>(216);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      const currentWidth = sidebarRef.current.offsetWidth;
      console.log('Current sidebar width:', currentWidth);
      setSidebarWidth(currentWidth);
    }
  }, [isExpanded]);

  return (
    <div className='h-screen flex'>
      <Sidebar ref={sidebarRef} />

      <div
        className='flex-1 overflow-auto bg-white'
        style={{ marginLeft: `${sidebarWidth}px` }}>
        <Header />
        <main className='px-10'>{children}</main>
      </div>
    </div>
  );
};
export default Layout;
