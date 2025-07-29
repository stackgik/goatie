/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import toast from 'react-hot-toast';

// Define types
interface Column {
  header: string;
  accessor?: string;
  format?: (value: any) => string;
}

interface ExportDataProps {
  data: Record<string, any>[];
  filename?: string;
  columns: Column[];
}

const ExportData = ({
  data,
  filename = 'export',
  columns,
}: ExportDataProps) => {
  // to manage loading state
  const [isExporting, setIsExporting] = useState(false);

  // Memoize formatted data to avoid re-computation on each render
  const formattedData = useMemo(() => {
    return data.map(item => {
      const formattedItem: Record<string, any> = {};
      columns.forEach(col => {
        const value = col.accessor ? item[col.accessor] : '';
        formattedItem[col.header] = col.format ? col.format(value) : value;
      });
      return formattedItem;
    });
  }, [data, columns]);

  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      // Dynamically import xlsx to avoid SSR issues
      const XLSX = await import('xlsx');

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      // Create a Blob and download
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Create a download link and trigger it
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Excel export failed:', error);
      toast.error('Failed to export Excel. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Import both libraries and ensure proper setup
      const { jsPDF } = await import('jspdf');
      const autoTable = await import('jspdf-autotable').then(
        module => module.default
      );

      // Create new document
      const doc = new jsPDF();
      const title = filename.replace(/_/g, ' ').toUpperCase();

      // Add title
      doc.setFontSize(16);
      doc.text(title, 14, 15);

      // Prepare table data
      const headers = columns.map(col => col.header);
      const body = formattedData.map(item =>
        columns.map(col => item[col.header] ?? '')
      );

      // Use the imported autoTable function directly with the doc
      autoTable(doc, {
        head: [headers],
        body: body,
        startY: 25,
        margin: { top: 20 },
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: 'linebreak',
          valign: 'middle',
        },
        headStyles: {
          fillColor: [59, 130, 246], // Blue-500
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [243, 244, 246], // Gray-50
        },
      });

      doc.save(`${filename}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      toast.error('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='flex items-center gap-1 bg-white capitalize text-[16px] font-smeibold text-gray-950 ml-6 py-6 cursor-pointer shadow-none border border-gray-200'
          disabled={isExporting}>
          <Download size={16} />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-32 bg-white z-10 p-1 space-y-2'>
        <DropdownMenuItem
          onClick={exportToExcel}
          disabled={isExporting}
          className='py-2 hover:bg-gray-50 cursor-pointer rounded-sm'>
          Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={exportToPDF}
          disabled={isExporting}
          className='py-2 hover:bg-gray-0 cursor-pointer rounded-sm'>
          PDF (.pdf)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportData;
