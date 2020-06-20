import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import { Helmet } from 'react-helmet';

import PageContainer from '../../component/pageContainer';
import PagePath from '../../component/PagePath';
import Search from '../../component/Search';
import BlogPostCard from '../../component/BlogPostCard';
import { BlogWrapper, SubTitle, BlogContainer, SideTagContainer, NavWrapper, NavItem, SubItem } from './styled';

import { GET_POSTS } from '../../queries/post.queries';
import { GET_TAGS } from '../../queries/tag.queries';
import { getPosts, getTags } from '../../types/api';
import { GET_LOCAL_USER } from '../../queries/client';

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const Blog = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const [category, setCategory] = useState(null);
  const [tagId, setTagId] = useState(null);
  const lastId = useRef(null);
  const { data, fetchMore, refetch } = useQuery<getPosts>(GET_POSTS, { variables: { category, tagId } });
  const { data: tagData } = useQuery<getTags>(GET_TAGS);

  useEffect(() => {
    refetch();
  }, []);

  const onScroll = useCallback(() => {
    if (
      lastId.current !== data?.GetPosts?.posts[data?.GetPosts?.posts.length - 1].id &&
      window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 400
    ) {
      lastId.current = data?.GetPosts?.posts[data?.GetPosts?.posts.length - 1].id;
      fetchMore({
        variables: {
          category,
          tagId,
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
  }, [data, category, lastId.current, tagId]);

  const onChangeCategory = useCallback((categoryName: string | null) => {
    setCategory(categoryName);
    setTagId(null);
  }, []);
  const onChangeTagId = useCallback((tagId: number) => {
    setTagId(tagId);
  }, []);

  const onClickWritePost = useCallback(() => {
    Router.push('/blog/write');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [data, category, lastId.current, tagId]);

  return (
    <>
      <Helmet>
        <title>블로그 :: chanyeong</title>
        <meta
          name="description"
          content="개발자 조찬영의 블로그 입니다. 개발을 진행하거나 일상생활에서 느낀 모든 점들을 적어놓았습니다."
        />
        <meta name="og:title" content="블로그 :: chanyeong" />
        <meta
          name="og:description"
          content="개발자 조찬영의 블로그 입니다. 개발을 진행하거나 일상생활에서 느낀 모든 점들을 적어놓았습니다."
        />
      </Helmet>
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
              <div>
                {userInfo?.isLoggedIn.userName && <button onClick={onClickWritePost}>포스트 작성</button>}
                <Search />
              </div>
            </NavWrapper>
            <section>
              {data?.GetPosts?.posts?.map((v) => (
                <BlogPostCard key={`blog_post${v.id}`} data={v} />
              ))}
            </section>
          </BlogContainer>
          <SideTagContainer>
            <SubItem>인기 태그</SubItem>
            <section>
              {tagData?.GetTags?.tags?.map((v) => (
                <div key={`popularity_tag${v.id}`} onClick={() => onChangeTagId(v.id)}>
                  {v.name}
                </div>
              ))}
            </section>
          </SideTagContainer>
        </BlogWrapper>
      </PageContainer>
    </>
  );
};

export default Blog;
