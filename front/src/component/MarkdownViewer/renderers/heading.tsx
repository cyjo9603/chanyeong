import React from 'react';

interface HeadingProps {
  level: number;
  children: React.ReactChildren[];
}

const flatten = (text, child) => {
  return typeof child === 'string' ? text + child : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const heading = ({ level, children }: HeadingProps) => {
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\s/g, '-');
  return React.createElement(`h${level}`, { id: slug }, children);
};

export default heading;
