/* eslint-disable @typescript-eslint/no-explicit-any */
import { formSchema } from '@/app/(auth)/sign-up/SignUpForm';
import { ComponentType } from 'react';
import { z } from 'zod';

export interface IGoat {
  goatId: string;
  goatName: string;
  image: string;
  amountBought: number;
  status: string;
  age: string;
  dob: Date;
  parent: string;
  gender: string;
  numOfKids: number;
  children: string[];
  healthIssues: string[];
}

export type SignUpField = {
  id: number;
  fieldName: keyof z.infer<typeof formSchema>; // Ensures fieldName matches schema keys
  placeholder: string;
  Icon: ComponentType<any>;
  label: string;
  type: string;
  toggleFieldName?: string;
};
