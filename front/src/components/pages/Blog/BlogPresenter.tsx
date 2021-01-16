import React from 'react';
import { Helmet } from 'react-helmet';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import BlogPostCard from '@organisms/BlogPostCard';
import Button from '@atoms/Button';
import { GetPosts_getPosts_posts as Post, GetTags_getTags_tags as Tag } from '@gql-types/api';
import BlogPostSearch from './BlogPostSearch';
import TagWithTextList from './TagWithTextList';
import CategoryNav from './CategoryNav';

interface Props {
  userName?: string;
  category: string | null;
  postData: Post[];
  tagData: Tag[];
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

const BlogPresenter = ({
  userName,
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
            <CategoryNav category={category} onChangeCategory={onChangeCategory} />
            <div className="auth-write">
              {userName && <Button onClick={onClickWritePost} name="포스트 작성" />}
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
