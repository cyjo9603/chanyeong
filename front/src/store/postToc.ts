import { makeVar } from '@apollo/client';

interface Toc {
  level: number;
  content: string;
  slug: string;
}

export const tocVar = makeVar<Toc[]>([]);

export const addToc = (heading: Toc) => {
  const currentToc = tocVar();
  tocVar([...currentToc, heading]);
};

export const resetToc = () => {
  tocVar([]);
};
