import { Bell } from 'lucide-react';
import NotificationMessages from './NotificationMessages';

const Notifications = () => {
  const isShowingNotifications = false;
  return (
    <div className='relative cursor-pointer'>
      <Bell size={24} />
      <span className='size-2 rounded-full bg-red-500 absolute -top-1 -right-1' />

      {isShowingNotifications && (
        <div className='absolute top-10 right-0 w-[400px]'>
          <NotificationMessages />
        </div>
      )}
    </div>
  );
};

export default Notifications;
