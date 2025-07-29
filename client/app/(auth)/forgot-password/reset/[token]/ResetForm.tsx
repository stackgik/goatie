/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TogglePasswordVisibility from '@/components/TogglePasswordVisibility';
import { signUpArr } from '@/app/constants';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePasswordToggle } from '@/app/contexts/PasswordToggleContext';
import { useRouter } from 'next/navigation';
import { Lock, MoveLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export const formSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters.',
      })
      .max(30, {
        message: 'Password must be less than 30 characters.',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ResetForm = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState<string | null>('reset-password');
  const { isVisible } = usePasswordToggle();

  useEffect(() => inputRef.current?.focus(), []);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    form.reset();
    router.push('/forgot-password/success');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 mt-8 bg-white p-8 rounded-lg'>
        {/* Password */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div
                  className={cn(
                    'flex items-center border border-gray-100 rounded-lg overflow-hidden transition-all duration-300',
                    isActive === 'reset-password' ? 'border-blue-300' : ''
                  )}>
                  <Lock size={16} className='w-[40px]' />
                  <Input
                    placeholder='Your New Password'
                    {...field}
                    className='border-none rounded-none'
                    type={isVisible('reset-password') ? 'text' : 'password'}
                    onFocus={() => setIsActive('reset-password')}
                    onBlur={() => setIsActive(null)}
                    ref={inputRef}
                  />
                  <TogglePasswordVisibility identifier='reset-password' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm password */}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div
                  className={cn(
                    'flex items-center border border-gray-100 rounded-lg overflow-hidden transition-all duration-300',
                    isActive === 'confirm-reset-password'
                      ? 'border-blue-300'
                      : ''
                  )}>
                  <Lock size={16} className='w-[40px]' />
                  <Input
                    placeholder='Confirm Your New Password'
                    {...field}
                    className='border-none rounded-none'
                    type={
                      isVisible('confirm-reset-password') ? 'text' : 'password'
                    }
                    onFocus={() => setIsActive('confirm-reset-password')}
                    onBlur={() => setIsActive(null)}
                  />
                  <TogglePasswordVisibility identifier='confirm-reset-password' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full bg-indigo-600 text-indigo-50 py-6'>
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;
