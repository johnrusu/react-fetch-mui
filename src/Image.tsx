import React from 'react';

interface ImageProps {
  src: string;
  alt?: string;
  [key: string]: any; // Allow additional props
  className?: string;
  onClickHistoryItem: (item: string) => void;
}

const Image: React.FC<ImageProps> = ({ src, alt, ...rest }) => {
  const { children, onClickHistoryItem, ...restOfProps } = rest;

  const openInNewWindow = (src: string) => {
    onClickHistoryItem(src);
    window.open(src, '_blank');
  };
  return (
    <div
      className={`image-wrapper ${restOfProps.className || ''}`}
      onClick={() => openInNewWindow(src)}
      {...restOfProps}
    >
      <img src={src} alt={alt || 'Image'} />
      {children}
    </div>
  );
};

export default Image;
