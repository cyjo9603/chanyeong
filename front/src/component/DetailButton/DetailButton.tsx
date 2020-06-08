import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

interface Props {
  title: string;
  link: string;
}

const DetailButton = ({ title, link }: Props) => (
  <Link href={link}>
    <a>
      <Button type="link">
        더 많은 {title} 보러가기
        <DoubleRightOutlined />
      </Button>
    </a>
  </Link>
);

export default DetailButton;
