import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import PageContainer from '../../component/pageContainer';
import PagePath from '../../component/PagePath';
import Search from '../../component/Search';
import BlogPostCard from '../../component/BlogPostCard';
import { BlogWrapper, SubTitle, BlogContainer, SideTagContainer, NavWrapper, NavItem } from './styled';

import { GET_POSTS } from './GetPosts.queries';
import { getPosts } from '../../types/api';

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const Blog = () => {
  const [category, setCategory] = useState(null);
  const lastId = useRef(null);
  const { data, fetchMore } = useQuery<getPosts>(GET_POSTS, { variables: { category } });

  const onScroll = useCallback(() => {
    if (
      lastId.current !== data?.GetPosts?.posts[data?.GetPosts?.posts.length - 1].id &&
      window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 400
    ) {
      lastId.current = data?.GetPosts?.posts[data?.GetPosts?.posts.length - 1].id;
      fetchMore({
        variables: {
          category,
          lastId: lastId.current,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          const newPosts = [...prev.GetPosts.posts, ...fetchMoreResult.GetPosts.posts];
          const fetchData: getPosts = { ...prev, GetPosts: { ...fetchMoreResult.GetPosts, posts: newPosts } };
          return fetchData;
        },
      });
    }
  }, [data, category, lastId.current]);

  const onChangeCategory = useCallback((categoryName: string | null) => {
    setCategory(categoryName);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [data, category, lastId.current]);

  return (
    <PageContainer>
      <PagePath data={path} />
      <SubTitle>개발을 진행하며 알게되거나 느낀 저의 이야기들을 적어놓았습니다.</SubTitle>
      <BlogWrapper>
        <BlogContainer>
          <NavWrapper>
            <div>
              <NavItem onClick={() => onChangeCategory(null)} currrentFocus={category === null}>
                All
              </NavItem>
              <NavItem onClick={() => onChangeCategory('DIARY')} currrentFocus={category === 'DIARY'}>
                diary
              </NavItem>
              <NavItem onClick={() => onChangeCategory('DEV')} currrentFocus={category === 'DEV'}>
                dev
              </NavItem>
            </div>
            <Search />
          </NavWrapper>
          <section>
            {data?.GetPosts?.posts?.map((v) => (
              <BlogPostCard key={`blog_post${v.id}`} data={v} />
            ))}
          </section>
        </BlogContainer>
        <SideTagContainer></SideTagContainer>
      </BlogWrapper>
    </PageContainer>
  );
};

export default Blog;
