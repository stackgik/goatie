'use client';
import { TbCurrencyNaira } from 'react-icons/tb';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Check,
  ExternalLink,
  MoreVertical,
  Pencil,
  Skull,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { IGoat } from '@/types/goat';
import { Status, statusStyles } from '@/app/constants';
import Image from 'next/image';

export const columns: ColumnDef<IGoat>[] = [
  {
    accessorKey: 'goatId',
    header: 'Goat ID',
    cell: ({ row }) => (
      <div className='font-semibold'>{row.getValue('goatId')}</div>
    ),
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className='relative h-[50px] aspect-square rounded-full overflow-hidden'>
        <Image
          fill
          src={'/assets/images/default-goat.webp'}
          alt={row.getValue('goatName')}
          objectFit='cover'
        />
      </div>
    ),
  },
  {
    accessorKey: 'goatName',
    header: 'Goat Name',
  },
  {
    accessorKey: 'age',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='!p-0 cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Age
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        className={`capitalize py-2 px-6 text-center font-medium rounded-[40px] w-max ${
          statusStyles[row.getValue('status') as Status]
        }`}>
        {row.getValue('status')}
      </div>
    ),
  },
  {
    accessorKey: 'amountBought',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='!p-0 cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Amount Bought
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rowValue = Number(row.getValue('amountBought'));
      const amount = rowValue.toFixed(2);
      return (
        <div className='flex items-center text-gray-400 fobt-black'>
          <TbCurrencyNaira />
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='!p-0 cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Gender
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('gender')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const goatId = row.original.goatId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='cursor-pointer'>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreVertical className='h-4 w-4 text-gray-400 fobt-black cursor-pointer' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='bg-white p-1 border border-gray-200 shadow-none w-[200px]'>
            <DropdownMenuItem className='cursor-pointer hover:bg-gray-50 flex items-center justify-between text-gray-400'>
              Mark as Sold
              <Check />
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-gray-200' />
            <DropdownMenuItem className='cursor-pointer hover:bg-gray-50 flex items-center justify-between text-gray-400'>
              Mark as Deceased
              <Skull />
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-gray-200' />
            <DropdownMenuItem
              onClick={() => console.log(goatId)}
              className='cursor-pointer hover:bg-gray-50 flex items-center justify-between text-gray-400'>
              Edit
              <Pencil />
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-gray-200' />
            <DropdownMenuItem className='cursor-pointer hover:bg-gray-50 flex items-center justify-between text-gray-400'>
              Share Profile
              <ExternalLink />
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-gray-200' />
            <DropdownMenuItem className='cursor-pointer hover:bg-gray-50 flex items-center justify-between text-gray-400'>
              Delete
              <Trash2 />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
