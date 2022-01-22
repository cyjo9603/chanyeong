import React from 'react';

const newLine = (text: string, title: string) => {
  const splitText = text.split('\n');
  return splitText.map((line, index) => (
    <span key={`${title}_${index}`}>
      {line}
      {index !== splitText.length && <br />}
    </span>
  ));
};

export default newLine;
