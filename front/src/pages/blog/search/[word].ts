import { GetServerSideProps } from 'next';

export { default } from '@pages/SeachBlogPost';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { word: context.query.word as string } };
};
