import * as React from 'react';
import { cn } from 'src/lib/utils';
import type { PropsWithClassName } from './ui.types';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & PropsWithClassName>(
  ({ className, ...props }, ref) => (
    <div className={cn('rounded-lg border bg-card text-card-foreground shadow-xs', className)} ref={ref} {...props} />
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & PropsWithClassName>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} ref={ref} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement> & PropsWithClassName>(
  ({ className, children, ...props }, ref) => (
    <h3 className={cn('text-2xl leading-none font-semibold tracking-tight', className)} ref={ref} {...props}>
      {children}
    </h3>
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & PropsWithClassName
>(({ className, ...props }, ref) => (
  <p className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & PropsWithClassName>(
  ({ className, ...props }, ref) => <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />,
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & PropsWithClassName>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex items-center p-6 pt-0', className)} ref={ref} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
