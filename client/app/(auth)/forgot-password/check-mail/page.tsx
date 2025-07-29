import { MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CheckMail = () => {
  return (
    <div className='auth-container bg-white'>
      <div className='auth-wrapper'>
        <div className='h-[150px] aspect-square  mx-auto mb-10 relative'>
          <Image
            fill
            src={'/assets/illustrations/mail-sent.png'}
            alt='mail sent'
            objectFit='contain'
          />
        </div>
        <h1 className='auth-wrapper_header'>Check your mail</h1>
        <p className='auth-wrapper_description'>
          We have sent a password recover instructions to your mail
        </p>
        <p className='text-sm text-gray-700 mt-8'>
          <Link href='/' className='flex gap-2 justify-center items-center'>
            <MoveLeft className='text-gray-500' />
            <span>Back to sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckMail;
