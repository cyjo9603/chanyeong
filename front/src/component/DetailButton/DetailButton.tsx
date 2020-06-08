import React from 'react';
import { Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';

interface Props {
  title: string;
}

const DetailButton = ({ title }: Props) => (
  <Button type="link">
    더 많은 {title} 보러가기
    <DoubleRightOutlined />
  </Button>
);

export default DetailButton;
