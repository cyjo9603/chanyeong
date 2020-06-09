import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Slider from 'react-slick';

import PageContainer from '../../../component/pageContainer';
import { SummaryWrapper, ArticleHeader, SliderWrapper } from '../styled';
import DetailButton from '../../../component/DetailButton';
import PostCard from '../../../component/PostCard';

import { GET_PICKED_POSTS } from './GetPickedPosts.queries';
import { getPickedPosts } from '../../../types/api';

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      src="/arrow_right.svg"
      alt="next post"
      onClick={onClick}
      style={{ ...style, width: 14, display: 'block' }}
    />
  );
}
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      src="/arrow_left.svg"
      alt="prev post"
      onClick={onClick}
      style={{ ...style, width: 14, display: 'block' }}
    />
  );
}

const PostSummary = () => {
  const { data } = useQuery<getPickedPosts>(GET_PICKED_POSTS);

  return (
    <SummaryWrapper>
      <PageContainer>
        <ArticleHeader>
          <h1>Blog</h1>
          <h2>개발을 진행하며 알게되거나 느긴 저의 이야기들을 적어놓았습니다.</h2>
        </ArticleHeader>
        <SliderWrapper>
          <Slider
            infinite={true}
            slidesToShow={3}
            slidesToScroll={1}
            speed={1000}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
            autoplay={true}
            autoplaySpeed={3000}
          >
            {data?.GetPickedPosts?.posts?.map((v) => (
              <PostCard key={`main_post_${v.id}`} data={v} />
            ))}
          </Slider>
        </SliderWrapper>

        <div>
          <DetailButton title="포스트" link="/blog" />
        </div>
      </PageContainer>
    </SummaryWrapper>
  );
};

export default PostSummary;