import { ListChecks } from 'lucide-react';
import { GiGoat } from 'react-icons/gi';

const NotificationMessages = () => {
  const notifications = [
    {
      id: 1,
      title: 'New message from Tosin',
      Avatar: GiGoat,
      time: '2 minutes ago',
    },
    {
      id: 2,
      title: 'New message from Tosin',
      Avatar: GiGoat,
      time: '2 minutes ago',
    },
    {
      id: 3,
      title: 'New message from Tosin',
      Avatar: GiGoat,
      time: '2 minutes ago',
    },
    {
      id: 4,
      title: 'New message from Tosin',
      Avatar: GiGoat,
      time: '2 minutes ago',
    },
  ];

  return (
    <div className='bg-[#f8f9fa] rounded-[20px] border border-white z-30'>
      <header className='flex items-center justify-between text-[#1f1e30] p-4'>
        <span className='text-xl font-bold'>Notifications</span>
        <ListChecks size={24} />
      </header>

      {/* the notifications */}
      <div className='flex flex-col gap-4'>
        {notifications.map(({ id, title, Avatar, time }) => (
          <div
            key={id}
            className='flex items-center gap-4 p-4 border-t border-gray-200'>
            <div className='w-[45px] h-[45px] bg-black flex items-center justify-center rounded-full outline outline-gray-200 outline-offset-6'>
              <Avatar size={32} className='text-white' />
            </div>

            <div className='flex flex-col'>
              <h3 className='text-[#1f1e30] font-bold text-lg'>{title}</h3>
              <p className='text-gray-500 text-sm'>{time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationMessages;
