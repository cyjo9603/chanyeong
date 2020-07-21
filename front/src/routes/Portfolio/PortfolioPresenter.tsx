import React from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet';

import PageContainer from '../../component/pageContainer';
import PagePath from '../../component/PagePath';
import ProjectCard from '../../component/ProjectCard';
import Button from '../../component/Button';
import { SubTitleWrapper, Title, ProjectListWrapper } from './styled';
import { LocalSignIn } from '../../apollo';
import { getProjects_GetProjects_project } from '../../types/api';

interface Props {
  userInfo: LocalSignIn;
  groupProjects: getProjects_GetProjects_project[];
  personalProjects: getProjects_GetProjects_project[];
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/portfolio', name: 'PORTFOLIO' },
];

const PortfolioPresenter = ({ userInfo, groupProjects, personalProjects }: Props) => (
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
    <PageContainer>
      <PagePath data={path} page="project" />
      <SubTitleWrapper>
        <h2>제가 지금까지 진행한 프로젝트들 입니다.</h2>
        {userInfo?.isLoggedIn.userName && (
          <Link href="/portfolio/add">
            <a>
              <Button name="프로젝트 추가" align="right" />
            </a>
          </Link>
        )}
      </SubTitleWrapper>
      {groupProjects.length !== 0 && (
        <>
          <Title>그룹 프로젝트</Title>
          <ProjectListWrapper>
            {groupProjects.map((v) => (
              <ProjectCard key={`group_project${v.id}`} projectInfo={v} />
            ))}
          </ProjectListWrapper>
        </>
      )}
      <Title>개인 프로젝트</Title>
      <ProjectListWrapper>
        {personalProjects.map((v) => (
          <ProjectCard key={`personal_project${v.id}`} projectInfo={v} />
        ))}
      </ProjectListWrapper>
    </PageContainer>
  </>
);

export default PortfolioPresenter;