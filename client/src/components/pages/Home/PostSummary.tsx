import React, { useMemo } from 'react';
import Slider from 'react-slick';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import DetailButton from '@molecules/DetailButton';
import MiniPostCard from '@organisms/MiniPostCard';
import Title, { SMALL_SIZE } from '@atoms/Title';
import SubTitle from '@atoms/SubTitle';
import SlickArrowIcon from '@src/components/icons/SlickArrowIcon';
import { GetPicked_getPickedPosts_posts as Post } from '@gql-types/api';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledPostSummary = styled.article`
  padding: 40px 0;
  width: 100%;

  & .slick-arrow {
    width: 14px;
    display: block;
    fill: ${({ theme }) => theme.PRIMARY_FONT};

    &.reverse {
      transform: rotate(180deg) translateY(50%);
    }
  }

  & .post-slide {
    width: 90%;
    margin: 0 auto;
    padding: 30px 0;
  }
`;

function NextArrow(props: any) {
  const { className, onClick } = props;
  return <SlickArrowIcon className={className} onClick={onClick} />;
}
function PrevArrow(props: any) {
  const { className, onClick } = props;
  return <SlickArrowIcon className={`${className} reverse`} onClick={onClick} />;
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
  data: Post[];
}

const PostSummary = ({ data }: Props) => {
  const showLength = useMemo(() => {
    const postsLength = data.length;
    return postsLength < 3 ? postsLength : 3;
  }, [data]);

  return (
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
  );
};

export default PostSummary;
