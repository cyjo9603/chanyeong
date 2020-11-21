import React from 'react';
import { Helmet } from 'react-helmet';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import BlogPostCard from '@organisms/BlogPostCard';
import BreadCrumbs from '@molecules/BreadCrumbs';
import Button from '@atoms/Button';
import SubTitle from '@atoms/SubTitle';
import { getPosts_GetPosts_posts, getTags_GetTags_tags } from '@gql-types/api';
import { LocalSignIn } from '@src/apollo';
import BlogPostSearch from './BlogPostSearch';
import TagWithTextList from './TagWithTextList';
import CategoryNav from './CategoryNav';

interface Props {
  userInfo?: LocalSignIn;
  category: string | null;
  postData: getPosts_GetPosts_posts[];
  tagData: getTags_GetTags_tags[];
  onClickWritePost: () => void;
  onChangeCategory: (categoryName: string | null) => void;
  onChangeTagId: (tagId: number) => void;
}

const StyledBlog = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  & > section {
    width: 80%;

    & > section {
      margin-top: 20px;
    }

    & > section > a > div {
      margin-bottom: 40px;
    }

    & > nav {
      display: flex;
      justify-content: space-between;

      & .auth-write {
        display: flex;

        @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
          & > form {
            display: none;
          }
        }
      }
    }

    @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
      width: 82%;
    }
    @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
      width: 100%;
    }
  }
`;

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const BlogPresenter = ({
  userInfo,
  category,
  postData,
  tagData,
  onClickWritePost,
  onChangeCategory,
  onChangeTagId,
}: Props) => (
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
    <RowFrame>
      <StyledBlog>
        <section>
          <nav>
            <CategoryNav
              category={category}
              onChangeCategory={onChangeCategory}
            />
            <div className="auth-write">
              {userInfo?.isLoggedIn.userName && (
                <Button onClick={onClickWritePost} name="포스트 작성" />
              )}
              <BlogPostSearch />
            </div>
          </nav>
          <section>
            {postData.map((v) => (
              <BlogPostCard key={`blog_post${v.id}`} data={v} />
            ))}
          </section>
        </section>
        <TagWithTextList tags={tagData} onCLick={onChangeTagId} />
      </StyledBlog>
    </RowFrame>
  </>
);

export default BlogPresenter;
