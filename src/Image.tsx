import React from "react";

interface ImageProps {
  src: string;
  alt?: string;
  [key: string]: any; // Allow additional props
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, ...rest }) => {
  const { children, ...restOfProps } = rest;

  const openInNewWindow = (src: string) => {
    window.open(src, "_blank");
  };
  return (
    <div
      className={`image-wrapper ${restOfProps.className || ""}`}
      onClick={() => openInNewWindow(src)}
    >
      <img src={src} alt={alt || "Image"} />
      {children}
    </div>
  );
};

export default Image;
