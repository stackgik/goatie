import React from 'react';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import ResetForm from './ResetForm';

const ResetPage = () => {
  return (
    <div className='auth-container bg-white'>
      <div className='auth-wrapper'>
        <h1 className='auth-wrapper_header'>Create new password</h1>
        <p className='auth-wrapper_description'>
          Your new password must be different from the previous one
        </p>
        <ResetForm />
        <p className='text-sm text-gray-700 mt-4'>
          <Link href='/' className='flex gap-2 justify-center items-center'>
            <MoveLeft className='text-gray-500' />
            <span>Back to sign in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPage;
