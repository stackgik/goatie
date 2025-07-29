import { months } from '@/app/constants';
import { useDate } from '@/app/contexts/DateContext';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getMonth, getYear } from 'date-fns';
import { useEffect } from 'react';

interface DayMonthYearPickerProps {
  value?: Date;
  startYear?: number;
  endYear?: number;
  onChange?: (date: Date) => void;
}

// prettier-ignore
const DayMonthYearPicker = ({startYear = 2000, endYear = getYear(new Date()), onChange, value}: DayMonthYearPickerProps) => {
  const {date, setDate} = useDate();
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => i + startYear );


   // Sync with external value when it changes
   useEffect(() => {
    if (value && (getMonth(value) !== getMonth(date) || getYear(value) !== getYear(date))) {
      setDate(value)
    }
  }, [value, setDate, date])

    // Update the date context and call onChange when month changes
    const setNewMonth = (month: string) => {
      const monthIndex = months.indexOf(month)
      // Create a new date with the selected month but preserve the day
      const newDate = new Date(date)
      newDate.setMonth(monthIndex)
  
      // Adjust for month length issues (e.g., March 31 -> April 30)
      if (newDate.getMonth() !== monthIndex) {
        newDate.setDate(0) // Set to last day of previous month
      }
  
      setDate(newDate)
      onChange?.(newDate)
    }
  
    // Update the date context and call onChange when year changes
    const setNewYear = (year: string) => {
      const yearNum = Number.parseInt(year)
      // Create a new date with the selected year but preserve the month and day
      const newDate = new Date(date)
      newDate.setFullYear(yearNum)
  
      setDate(newDate)
      onChange?.(newDate)
    }



  return (
    <div className='flex items-center justify-between p-2'>
     
      <Select onValueChange={setNewMonth} value={months[date.getMonth()]}>
        <SelectTrigger className='max-w-[110px]' >
          <SelectValue placeholder='MM' />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectGroup>
            {months.map((month) => (
              <SelectItem key={month} value={month} className='hover:bg-gray-50 cursor-pointer'>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Year Selector */}
      <Select onValueChange={setNewYear} value={String(getYear(date))}>
        <SelectTrigger className='max-w-[110px]'>
          <SelectValue placeholder='YYYY' />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectGroup>
            {years.reverse().map((year) => (
              <SelectItem key={year} value={String(year)} className='hover:bg-gray-50 cursor-pointer'>{year}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DayMonthYearPicker;
