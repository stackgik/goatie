import Image from 'next/image';
const User = () => {
  const user = 'Doyin';
  return (
    <div className='flex items-center gap-4'>
      <Image
        src='/assets/images/default-user.webp'
        alt='user'
        width={35}
        height={35}
        objectFit='cover'
        className='rounded-full'
      />
      <span className='text-xl font-medium'>{user}</span>
    </div>
  );
};

export default User;
