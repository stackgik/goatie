import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  return (
    <div className='auth-container bg-white'>
      <div className='auth-wrapper'>
        <h1 className='auth-wrapper_header'>Forgot password?</h1>
        <p className='auth-wrapper_description'>
          Enter the email associated with your account and we&apos;ll send an
          email with instructions to reset your password.
        </p>
        <ForgotPasswordForm />
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

export default ForgotPasswordPage;
