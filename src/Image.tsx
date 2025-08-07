import React from "react";

interface ImageProps {
  src: string;
  alt?: string;
  [key: string]: any; // Allow additional props
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, ...rest }) => {
  return (
    <div className={`image-wrapper ${rest.className || ""}`}>
      <img src={src} alt={alt || "Image"} {...rest} />
    </div>
  );
};

export default Image;
