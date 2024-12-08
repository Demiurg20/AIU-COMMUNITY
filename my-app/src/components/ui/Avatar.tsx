// src/components/ui/Avatar.tsx
import React from 'react';

interface AvatarProps {
  children: React.ReactNode;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, className }) => {
  return <div className={`avatar ${className}`}>{children}</div>;
};

const AvatarImage: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => (
  <img className="avatar-image" src={src || '/default-avatar.png'} alt={alt} />
);

const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="avatar-fallback">{children}</div>
);

export { Avatar, AvatarImage, AvatarFallback };
