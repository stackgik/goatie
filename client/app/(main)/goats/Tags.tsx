import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const Tags = ({ tag, onRemove }: { tag: string; onRemove: () => void }) => {
  return (
    <Badge variant='secondary' className='flex items-center gap-1'>
      {tag}
      <button type='button' onClick={onRemove}>
        <X size={14} className='cursor-pointer' />
      </button>
    </Badge>
  );
};

export default Tags;
