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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';

import { CalendarIcon, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { goatStatuses } from '@/app/constants';
import { goats } from './mockGoats';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';
import DayMonthYearPicker from '@/components/DayMonthYearPicker';
import { DateProvider } from '@/app/contexts/DateContext';

const NewGoatForm = () => {
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [healthValue, setHealthValue] = useState<string>('');
  const [healthIssuesAddError, setHealthIssuesAddError] = useState<string>('');
  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>(
    undefined
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const formSchema = z.object({
    amountBought: z.coerce.number().int().nonnegative(), //the coerce makes sure it's a number before validation
    status: z.enum(['alive', 'dead', 'sold', 'missing', 'stolen', 'consumed']),
    dob: z.date().refine(date => date <= new Date(), {
      message: 'Date of birth cannot be in the future',
    }),
    gender: z.enum(['doe', 'buck']),
    children: z.array(z.string().min(1, 'Child ID cannot be empty')).optional(),
    healthIssues: z
      .array(z.string().min(1, 'Health issue cannot be empty'))
      .optional(),
  });

  //* Functionality to get yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountBought: 0,
      status: 'alive',
      dob: yesterday,
      gender: 'doe',
      children: [],
      healthIssues: [],
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = { ...data, healthIssues };
    console.log(formData);
  };

  const addHealthIssue = (issue: string) => {
    // 1. Take the input value
    const healthIssue = issue;
    // 2. Check if the value is not already present in the health array. If yes, throw an error
    const isDuplicate = healthIssues.some(health => health === healthIssue);
    if (isDuplicate) {
      setHealthIssuesAddError('Health issue already exists');
      setHealthValue('');
      return;
    }
    // 3. Add it to the health issues state
    setHealthIssues([...healthIssues, healthIssue]);
    // 4. Clear the input value
    setHealthValue('');
    setHealthIssuesAddError('');
  };

  const removeHealthIssue = (issue: string) => {
    const filteredHealthIssues = healthIssues.filter(
      healthIssue => healthIssue !== issue
    );
    setHealthIssues(filteredHealthIssues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* AmountBought */}
        <FormField
          control={form.control}
          name='amountBought'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount Bought</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='amount bought'
                  className='shad-input'
                  ref={inputRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='shad-select-trigger'>
                    <SelectValue placeholder='Select goat status...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='shad-select-content'>
                  {goatStatuses.map(status => (
                    <SelectItem
                      key={status}
                      value={status}
                      className='shad-select-item'>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of birth */}
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild className='w-full'>
                  <FormControl>
                    <Button
                      type='button'
                      variant='outline'
                      className={cn(
                        'w-full text-left font-normal py-6 px-3 shadow-none border border-gray-100',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0 bg-white' align='start'>
                  <DateProvider>
                    <DayMonthYearPicker
                      value={field.value}
                      onChange={date => {
                        // Update the form field
                        field.onChange(date);
                        // Update the calendar view to show the selected month
                        setCalendarMonth(date);
                      }}
                    />
                    <Calendar
                      mode='single'
                      className='pointer-events-auto z-10 w-full'
                      selected={field.value}
                      onSelect={date => {
                        field.onChange(date);
                        // setOpen(false);
                      }}
                      disabled={date =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      // Set the month that the calendar displays
                      month={calendarMonth}
                      onMonthChange={setCalendarMonth}
                      initialFocus
                    />
                  </DateProvider>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='shad-select-trigger'>
                    <SelectValue placeholder='Select goat gender...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='shad-select-content'>
                  <SelectItem value='doe' className='shad-select-item'>
                    Doe
                  </SelectItem>
                  <SelectItem value='buck' className='shad-select-item'>
                    Buck
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Children */}
        <FormField
          control={form.control}
          name='children'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Children</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-start shadow-none py-6 border border-gray-100'>
                    {field.value && field.value.length > 0
                      ? `${field.value.length} selected`
                      : 'Select children...'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0 bg-white'>
                  <Command>
                    <CommandInput placeholder='Search children...' />
                    <CommandList className=''>
                      <CommandGroup>
                        {goats?.map(({ goatId, goatName }) => (
                          <CommandItem
                            key={goatId}
                            onSelect={() => {
                              const currentValues = field.value || [];
                              const newValues = currentValues.includes(goatId)
                                ? currentValues.filter(id => id !== goatId)
                                : [...currentValues, goatId];
                              field.onChange(newValues);
                            }}>
                            <Checkbox
                              checked={field.value?.includes(goatId) || false}
                              className='mr-2'
                            />
                            {goatName || goatId}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Display selected children as tags */}
              <div className='flex flex-wrap gap-2 mt-2'>
                {field.value?.map(childId => {
                  const child = goats.find(c => c.goatId === childId);
                  return (
                    <Badge
                      key={childId}
                      variant='secondary'
                      className='flex items-center gap-1'>
                      {child?.goatName || childId}
                      <button
                        type='button'
                        onClick={() => {
                          field.onChange(
                            field.value?.filter(id => id !== childId)
                          );
                        }}
                        className='ml-1'>
                        <X size={14} className='cursor-pointer' />
                      </button>
                    </Badge>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Health Issues */}
        <div className='space-y-4'>
          <FormLabel>Goat Health Issues</FormLabel>
          <div className='flex items-center gap-2'>
            <Input
              placeholder='Enter goat health issue...'
              value={healthValue}
              onChange={e => setHealthValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addHealthIssue(healthValue);
                }
              }}
              className='flex-1 shadow-none py-6 border border-gray-100'
            />
            <Button
              type='button'
              onClick={() => addHealthIssue(healthValue)}
              size='icon'
              className='shad-secondary-btn w-max shrink-0'>
              <Plus size={16} /> Add
            </Button>
          </div>

          <div className='flex flex-wrap gap-2 mt-2'>
            {healthIssues?.map((healthIssue, index) => {
              return (
                <Badge
                  key={index}
                  variant='secondary'
                  className='flex items-center gap-1'>
                  {healthIssue}
                  <button
                    type='button'
                    onClick={() => removeHealthIssue(healthIssue)}
                    className='ml-1'>
                    <X size={14} className='cursor-pointer' />
                  </button>
                </Badge>
              );
            })}
          </div>
          <FormMessage className='text-red-500'>
            {healthIssuesAddError}
          </FormMessage>
        </div>

        <Button type='submit' className='shad-primary-btn'>
          Add New Goat
        </Button>
      </form>
    </Form>
  );
};

export default NewGoatForm;
