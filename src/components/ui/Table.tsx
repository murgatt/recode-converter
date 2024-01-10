import * as React from 'react';
import { cn } from 'src/lib/utils';
import type { PropsWithClassName } from './ui.types';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement> & PropsWithClassName>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} ref={ref} {...props} />
    </div>
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & PropsWithClassName
>(({ className, ...props }, ref) => <thead className={cn('[&_tr]:border-b', className)} ref={ref} {...props} />);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & PropsWithClassName
>(({ className, ...props }, ref) => (
  <tbody className={cn('[&_tr:last-child]:border-0', className)} ref={ref} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & PropsWithClassName
>(({ className, ...props }, ref) => (
  <tfoot className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} ref={ref} {...props} />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement> & PropsWithClassName>(
  ({ className, ...props }, ref) => (
    <tr
      className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
      ref={ref}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & PropsWithClassName
>(({ className, ...props }, ref) => (
  <th
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className,
    )}
    ref={ref}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & PropsWithClassName
>(({ className, ...props }, ref) => (
  <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} ref={ref} {...props} />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement> & PropsWithClassName
>(({ className, ...props }, ref) => (
  <caption className={cn('mt-4 text-sm text-muted-foreground', className)} ref={ref} {...props} />
));
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
