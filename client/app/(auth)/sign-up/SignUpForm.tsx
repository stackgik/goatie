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
import { cn } from '@/lib/utils';

export const formSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.',
      })
      .max(30, {
        message: 'Username must be less than 30 characters.',
      }),
    email: z.string().email({
      message: 'Please provide a valid email.',
    }),
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

const SignUpForm = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState<string | null>(null);
  const { isVisible } = usePasswordToggle();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => inputRef.current?.focus(), []);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    form.reset();
    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 mt-8 bg-white p-8 rounded-lg'>
        {signUpArr.map(
          ({
            id,
            fieldName,
            placeholder,
            Icon,
            label,
            type,
            toggleFieldName,
          }) => (
            <FormField
              control={form.control}
              name={fieldName}
              key={id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        'flex items-center border border-gray-100 rounded-lg overflow-hidden',
                        isActive === fieldName ? 'border-blue-300' : ''
                      )}>
                      <Icon size={16} className='w-[40px]' />
                      <Input
                        placeholder={placeholder}
                        {...field}
                        type={
                          toggleFieldName &&
                          isVisible(toggleFieldName) &&
                          type === 'password'
                            ? 'text'
                            : type
                        }
                        className='border-none rounded-none'
                        onFocus={() => setIsActive(fieldName)}
                        onBlur={() => setIsActive(null)}
                        onClick={e => e.stopPropagation()}
                        ref={fieldName === 'username' ? inputRef : null}
                      />
                      {toggleFieldName && (
                        <TogglePasswordVisibility
                          identifier={toggleFieldName}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
        <Button type='submit' className='w-full bg-indigo-600 text-white py-6'>
          Sign Up
        </Button>

        <p className='text-sm text-center text-gray-700'>
          Already have an account?{' '}
          <Link href='/' className='text-indigo-600'>
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
