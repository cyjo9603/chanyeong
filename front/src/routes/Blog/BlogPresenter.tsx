import React from 'react';
import { Helmet } from 'react-helmet';

import PageContainer from '@component/pageContainer';
import PagePath from '@component/PagePath';
import Search from '@commons/Search';
import BlogPostCard from '@component/BlogPostCard';
import Button from '@commons/Button';
import Text from '@commons/Text';
import TagCount from '@component/TagCount';
import { getPosts_GetPosts_posts, getTags_GetTags_tags } from '@gql-types/api';
import { LocalSignIn } from '@src/apollo';
import { BlogWrapper, BlogContainer, SideTagContainer, NavWrapper, NavItem, SubItem } from './styled';

interface Props {
  userInfo?: LocalSignIn;
  category: string | null;
  searchWord: string;
  postData: getPosts_GetPosts_posts[];
  tagData: getTags_GetTags_tags[];
  onSearch: (e: React.FormEvent) => void;
  onClickWritePost: () => void;
  onChangeSearchWord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategory: (categoryName: string | null) => void;
  onChangeTagId: (tagId: number) => void;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const CATEGORY_DIARY = 'DIARY';
const CATEGORY_DEV = 'DEV';

const BlogPresenter = ({
  userInfo,
  category,
  searchWord,
  postData,
  tagData,
  onSearch,
  onClickWritePost,
  onChangeSearchWord,
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
    <PageContainer>
      <PagePath data={path} page="blog" />
      <Text content="개발을 진행하며 알게되거나 느낀 저의 이야기들을 적어놓았습니다." />
      <BlogWrapper>
        <BlogContainer>
          <NavWrapper>
            <div>
              <NavItem onClick={() => onChangeCategory(null)} currrentFocus={category === null}>
                All
              </NavItem>
              <NavItem onClick={() => onChangeCategory(CATEGORY_DIARY)} currrentFocus={category === CATEGORY_DIARY}>
                diary
              </NavItem>
              <NavItem onClick={() => onChangeCategory(CATEGORY_DEV)} currrentFocus={category === CATEGORY_DEV}>
                dev
              </NavItem>
            </div>
            <div>
              {userInfo?.isLoggedIn.userName && <Button onClick={onClickWritePost} name="포스트 작성" />}
              <Search onChange={onChangeSearchWord} value={searchWord} onClick={onSearch} />
            </div>
          </NavWrapper>
          <section>
            {postData.map((v) => (
              <BlogPostCard key={`blog_post${v.id}`} data={v} />
            ))}
          </section>
        </BlogContainer>
        <SideTagContainer>
          <SubItem>인기 태그</SubItem>
          <section>
            {tagData.map((v) => (
              <TagCount key={`popularity_tag${v.id}`} data={v} onClick={onChangeTagId} />
            ))}
          </section>
        </SideTagContainer>
      </BlogWrapper>
    </PageContainer>
  </>
);

export default BlogPresenter;
