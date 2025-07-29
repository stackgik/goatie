'use client';

import { usePasswordToggle } from '@/app/contexts/PasswordToggleContext';
import TogglePasswordVisibility from '@/components/TogglePasswordVisibility';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const SignInForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState<string | null>(null);
  const { isVisible } = usePasswordToggle();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const resetFields = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      toast.error('Missing username');
      resetFields();
      return;
    }
    if (!password) {
      toast.error('Missing password');
      resetFields();
      return;
    }

    const data = {
      username,
      password,
    };

    console.log(data);
    resetFields();
    router.replace('/dashboard');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='grid mt-8 gap-6 bg-white p-8 rounded-lg'>
      <div className='grid gap-2 text-gray-700'>
        <Label htmlFor='username'>Username</Label>
        <div
          className={cn(
            'flex items-center border border-gray-100 rounded-lg overflow-hidden',
            isActive === 'signin-username' ? 'border-blue-300' : ''
          )}>
          <User size={16} className='w-[40px]' />
          <Input
            placeholder='Your Username'
            id='username'
            onFocus={() => setIsActive('signin-username')}
            onBlur={() => setIsActive(null)}
            onChange={e => setUsername(e.target.value)}
            className='flex-1 border-none pr-4 rounded-none'
            value={username}
            ref={inputRef}
          />
        </div>
      </div>

      <div className='grid gap-2 text-gray-700'>
        <Label htmlFor='password'>Password</Label>

        <div
          className={cn(
            'flex items-center border border-gray-100 rounded-lg overflow-hidden',
            isActive === 'signin-password' ? 'border-blue-300' : ''
          )}>
          <Lock size={16} className='w-[40px]' />
          <Input
            placeholder='Your Password'
            id='password'
            className='flex-1 border-none rounded-none'
            type={isVisible('signin-password') ? 'text' : 'password'}
            onFocus={() => setIsActive('signin-password')}
            onBlur={() => setIsActive(null)}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <TogglePasswordVisibility identifier={'signin-password'} />
        </div>
      </div>

      <div className='text-right'>
        <Link
          href='/forgot-password'
          className='text-[12px] text-gray-600 font-medium capitalize'>
          forgot password?
        </Link>
      </div>

      <Button type='submit' className='w-full bg-indigo-600 text-white py-6'>
        Sign In
      </Button>

      <p className='text-sm text-center text-gray-700'>
        Don&apos;t have an account?{' '}
        <Link href='/sign-up' className='text-indigo-600'>
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
