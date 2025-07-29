import { useSidebarExpandable } from '@/app/contexts/SidebarExpandableContext';
import { PanelLeft } from 'lucide-react';
const SidebarTrigger = () => {
  const { isExpanded, setIsExpanded } = useSidebarExpandable();

  return (
    <div className='cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
      <PanelLeft size={18} />
    </div>
  );
};

export default SidebarTrigger;
