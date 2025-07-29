import { usePasswordToggle } from '@/app/contexts/PasswordToggleContext';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';

const TogglePasswordVisibility = ({ identifier }: { identifier: string }) => {
  const { isVisible, toggleVisibility } = usePasswordToggle();

  return (
    <Button
      variant={'ghost'}
      type='button'
      className='h-full w-[40px] flex items-center justify-center'
      onClick={() => toggleVisibility(identifier)}>
      {!isVisible(identifier) ? (
        <Eye size={16} className='cursor-pointer w-[40px]' />
      ) : (
        <EyeOff size={16} className='cursor-pointer w-[40px]' />
      )}
    </Button>
  );
};

export default TogglePasswordVisibility;
