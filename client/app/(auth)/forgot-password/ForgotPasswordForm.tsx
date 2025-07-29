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
import { Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please provide a valid email',
  }),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const form = useForm<FormData>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    form.reset();
    router.push('/forgot-password/check-mail');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <div
                  className={cn(
                    'flex items-center border border-gray-100 rounded-lg overflow-hidden',
                    isActive ? 'border-blue-300' : ''
                  )}>
                  <Mail size={16} className='w-[40px]' />
                  <Input
                    placeholder='Your Email'
                    {...field}
                    type='email'
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                    className='border-none rounded-none'
                    ref={inputRef}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='py-6 bg-indigo-600 text-indigo-50 w-full rounded-lg'>
          Send Instructions
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
