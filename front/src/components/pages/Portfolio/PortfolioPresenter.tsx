import React from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet';

import RowFrame from '@frames/RowFrame';
import ProjectCard from '@organisms/ProjectCard';
import BreadCrumbs from '@molecules/BreadCrumbs';
import Button from '@atoms/Button';
import Title, { SMALL_SIZE } from '@atoms/Title';
import SubTitle from '@atoms/SubTitle';
import { GetProjects_GetProjects_project as Proejct } from '@gql-types/api';
import styled from '@theme/styled';

interface Props {
  userName?: string;
  groupProjects: Proejct[];
  personalProjects: Proejct[];
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/portfolio', name: 'PORTFOLIO' },
];

const StyledProjectList = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-row-gap: 30px;

  & .portfolio-sub-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    grid-template-columns: 1fr;
    justify-items: left;
  }
`;

const PortfolioPresenter = ({ userName, groupProjects, personalProjects }: Props) => (
  <>
    <Helmet>
      <title>포트폴리오 :: chanyeong</title>
      <meta
        name="description"
        content="개발자 조찬영의 포트폴리오입니다. 개발을 하며 진행해온 프로젝트들을 기록해놓았습니다."
      />
      <meta name="og:title" content="포트폴리오 :: chanyeong" />
      <meta
        name="og:description"
        content="개발자 조찬영의 포트폴리오입니다. 개발을 하며 진행해온 프로젝트들을 기록해놓았습니다."
      />
    </Helmet>
    <RowFrame>
      <BreadCrumbs data={path} page="project" />
      <div className="portfolio-sub-title">
        <SubTitle text="제가 지금까지 진행한 프로젝트들 입니다." />
        {userName && (
          <Link href="/portfolio/add" prefetch={false}>
            <a>
              <Button name="프로젝트 추가" align="right" />
            </a>
          </Link>
        )}
      </div>
      {groupProjects.length !== 0 && (
        <>
          <Title text="그룹 프로젝트" size={SMALL_SIZE} />
          <StyledProjectList>
            {groupProjects.map((v) => (
              <ProjectCard key={`group_project${v.id}`} projectInfo={v} />
            ))}
          </StyledProjectList>
        </>
      )}
      <Title text="개인 프로젝트" size={SMALL_SIZE} />
      <StyledProjectList>
        {personalProjects.map((v) => (
          <ProjectCard key={`personal_project${v.id}`} projectInfo={v} />
        ))}
      </StyledProjectList>
    </RowFrame>
  </>
);

export default PortfolioPresenter;
