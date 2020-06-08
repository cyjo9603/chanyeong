import React from 'react';
import AboutValueWrapper from './styled';

interface Props {
  engTitle: string;
  korTitle: string;
  content: string;
}

const AboutValue = ({ engTitle, korTitle, content }: Props) => (
  <AboutValueWrapper>
    <h2>{engTitle}</h2>
    <div>
      <h1>{korTitle}</h1>
    </div>
    <span>{content}</span>
  </AboutValueWrapper>
);

export default AboutValue;
