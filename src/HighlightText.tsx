import React from 'react';

interface HighlightTextProps {
  text: string;
  highlight: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }) => {
  if (!highlight) return <>{text}</>;
  const regex = new RegExp(
    `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className='bg-yellow-400'>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

export default HighlightText;
