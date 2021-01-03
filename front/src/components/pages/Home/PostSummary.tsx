import React, { useMemo } from 'react';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import DetailButton from '@molecules/DetailButton';
import MiniPostCard from '@organisms/MiniPostCard';
import Title, { SMALL_SIZE } from '@atoms/Title';
import SubTitle from '@atoms/SubTitle';
import { getPicked_GetPickedPosts_posts } from '@gql-types/api';

const StyledPostSummary = styled.article`
  padding: 40px 0;
  width: 100%;

  & .post-slide {
    width: 90%;
    margin: 0 auto;
    padding: 30px 0;
  }
`;

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

const settings = {
  infinite: true,
  slidesToScroll: 1,
  speed: 1000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface Props {
  data: getPicked_GetPickedPosts_posts[];
}

const PostSummary = ({ data }: Props) => {
  const showLength = useMemo(() => {
    const postsLength = data.length;
    return postsLength < 3 ? postsLength : 3;
  }, [data]);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Helmet>
      <RowFrame>
        <StyledPostSummary>
          <Title size={SMALL_SIZE} text="Blog" align="center" />
          <SubTitle
            text="개발을 진행하며 알게되거나 느낀 저의 이야기들을 적어놓았습니다."
            align="center"
          />
          <div className="post-slide">
            <Slider {...settings} slidesToShow={showLength}>
              {data.map((v) => (
                <MiniPostCard key={`main_post_${v.id}`} data={v} />
              ))}
            </Slider>
          </div>
          <DetailButton title="포스트" link="/blog" />
        </StyledPostSummary>
      </RowFrame>
    </>
  );
};

export default PostSummary;
