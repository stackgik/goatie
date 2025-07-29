import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface DialogBoxProps {
  trigger: ReactNode;
  children: ReactNode;
}

const DialogBox = ({ trigger, children }: DialogBoxProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className='shadow-sm border-none bg-white max-h-[95%] overflow-y-scroll'>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
