import {
  CalendarRange,
  LayoutGrid,
  TrendingUpDown,
  Wallet,
} from 'lucide-react';

import { GiGoat } from 'react-icons/gi';
import { Lock, Mail, User } from 'lucide-react';
import { SignUpField } from '@/types/goat';

export const columns = [
  'goatId',
  'image',
  'age',
  'status',
  'amountBought',
  'gender',
];

export const NO_OF_COLUMNS = columns.length;

export const sidebarContent = [
  {
    id: 1,
    label: 'Dashboard',
    Icon: LayoutGrid,
    url: '/dashboard',
  },
  {
    id: 2,
    label: 'Goats',
    Icon: GiGoat,
    url: '/goats',
  },
  {
    id: 3,
    label: 'Sales',
    Icon: TrendingUpDown,
    url: '/sales',
  },
  {
    id: 4,
    label: 'Expenses',
    Icon: Wallet,
    url: '/expenses',
  },

  {
    id: 5,
    label: 'visit schedules',
    Icon: CalendarRange,
    url: '/visit-schedules',
  },
];

// utils/statusStyles.ts
export const statusStyles = {
  alive: 'bg-green-100 text-green-800', // Light green background, dark green text
  dead: 'bg-gray-100 text-gray-800', // Light gray background, dark gray text
  sold: 'bg-blue-100 text-blue-800', // Light blue background, dark blue text
  missing: 'bg-yellow-100 text-yellow-800', // Light yellow background, dark yellow text
  stolen: 'bg-red-100 text-red-800', // Light red background, dark red text
  consumed: 'bg-purple-100 text-purple-800', // Light purple background, dark purple text
};

// TypeScript: Ensure all statuses are covered
export type Status = keyof typeof statusStyles;

export const goatStatuses = [
  'alive',
  'dead',
  'sold',
  'missing',
  'stolen',
  'consumed',
];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const tableColumns = [
  { header: 'Goat ID', accessor: 'goatId' },
  { header: 'Goat Name', accessor: 'goatName' },
  { header: 'Amount Bought', accessor: 'amountBought' },
  { header: 'Status', accessor: 'status' },
  { header: 'Date of Birth', accessor: 'dob' },
  { header: 'Gender', accessor: 'gender' },
  { header: 'Number of Kids', accessor: 'numOfKids' },
  { header: 'Children', accessor: 'children' },
];

export const signUpArr: SignUpField[] = [
  {
    id: 1,
    fieldName: 'username',
    placeholder: 'Your Username',
    Icon: User,
    label: 'Username',
    type: 'text',
  },
  {
    id: 2,
    fieldName: 'email',
    placeholder: 'Your Email',
    Icon: Mail,
    label: 'Email Address',
    type: 'email',
  },
  {
    id: 3,
    fieldName: 'password',
    placeholder: 'Create Password',
    Icon: Lock,
    label: 'Password',
    type: 'password',
    toggleFieldName: 'signup-password',
  },
  {
    id: 4,
    fieldName: 'confirmPassword',
    placeholder: 'Confirm Password',
    Icon: Lock,
    label: 'Confirm Password',
    type: 'password',
    toggleFieldName: 'signup-confirm-password',
  },
];
