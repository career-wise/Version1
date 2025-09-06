import React from 'react';
import { cn } from '../../../lib/utils';

interface AvatarProps {
  children: React.ReactNode;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, className }) => {
  return (
    <div className={cn("relative flex shrink-0 overflow-hidden rounded-full", className)}>
      {children}
    </div>
  );
};

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage: React.FC<AvatarImageProps> = ({ className, ...props }) => {
  return (
    <img 
      className={cn("aspect-square h-full w-full", className)} 
      {...props} 
    />
  );
};

interface AvatarFallbackProps {
  children: React.ReactNode;
  className?: string;
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}>
      {children}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback };