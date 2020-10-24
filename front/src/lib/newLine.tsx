import React from 'react';

const newLine = (text: string) => {
  const splitText = text.split('\n');
  return splitText.map((line, index) => (
    <>
      {line}
      {index !== splitText.length && <br />}
    </>
  ));
};

export default newLine;
