import React, { FC } from 'react';

import RowFrame from '@frames/RowFrame';
import BreadCrumbs from '@molecules/BreadCrumbs';
import SubTitle from '@atoms/SubTitle';

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/blog', name: 'BLOG' },
];

const BlogHeader: FC = () => (
  <RowFrame>
    <BreadCrumbs data={path} page="blog" />
    <SubTitle text="개발을 진행하며 알게되거나 느낀 저의 이야기들을 적어놓았습니다." />
  </RowFrame>
);

export default BlogHeader;
