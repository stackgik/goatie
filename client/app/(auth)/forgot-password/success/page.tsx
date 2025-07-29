import { MoveLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ResetSuccess = () => {
  return (
    <div className='auth-container bg-white'>
      <div className='auth-wrapper'>
        <div className='bg-indigo-50 h-[150px] aspect-square flex items-center justify-center mx-auto rounded-full mb-8'>
          <div className='text-indigo-600 bg-indigo-100 h-[100px] aspect-square flex items-center justify-center rounded-full'>
            <ShieldCheck size={50} />
          </div>
        </div>

        <h1 className='auth-wrapper_header'>Password changed successfully!</h1>
        <p className='auth-wrapper_description'>
          You can now sign in with your new password.
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

export default ResetSuccess;
