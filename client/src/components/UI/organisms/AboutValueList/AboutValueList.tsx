import React from 'react';

import styled from 'styled-components';
import AboutValue from '@organisms/AboutValue';

const StyledAboutValueList = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    & > div {
      margin-bottom: 40px;

      & :last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const AboutValueList = () => (
  <StyledAboutValueList>
    <AboutValue
      engTitle="Fun"
      korTitle="재미"
      content="저는 개발을 좋아합니다. 누군가 가장 좋아하는 취미를 물어본다면 고민없이 개발이라고 얘기할 것입니다. 이 마음가짐을 꾸준히 가지고 항상 즐기며 개발을 하겠습니다."
    />
    <AboutValue
      engTitle="Change"
      korTitle="변화"
      content="기술의 발전으로 인해 개발 분야의 기술 또한 빠른 속도로 변화하고 있습니다. 저는 이 변화를 놓치지 않고 항상 변화에 적응하며 새로운 기술에 적응하겠습니다."
    />
    <AboutValue
      engTitle="Communication"
      korTitle="소통"
      content="현대의 소프트웨어는 크고 복잡해졌습니다. 때문에 개발자들과의 협업과정은 선택이 아니라 필수라고 생각됩니다. 협업을 진행하며 가장 중요한 가치는 소통 이라고 생각하기 때문에 소통하기위해 노력 하겠습니다."
    />
  </StyledAboutValueList>
);

export default AboutValueList;
