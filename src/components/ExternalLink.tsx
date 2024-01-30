import React from 'react';

type ExternalLinkProps = {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, href, ...otherProps }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      window.electron.openExternalLink(href);
    };

    return (
      <a href={href} ref={ref} {...otherProps} onClick={handleClick}>
        {children}
      </a>
    );
  },
);

ExternalLink.displayName = 'ExternalLink';
