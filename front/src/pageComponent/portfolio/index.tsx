import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';

import PageContainer from '../../component/pageContainer';
import PagePath from '../../component/PagePath';
import ProjectCard from '../../component/ProjectCard';
import { SubTitleWrapper, Title, ProjectListWrapper } from './styled';
import { getProjects } from '../../types/api';
import { GET_PROJECTS } from '../../queries/project.queries';
import { GET_LOCAL_USER } from '../../queries/client';

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/portfolio', name: 'PORTFOLIO' },
];

const Portfolio = () => {
  const { data: userInfo } = useQuery(GET_LOCAL_USER);
  const { data: groupData } = useQuery<getProjects>(GET_PROJECTS, { variables: { type: 'GROUP' } });
  const { data: personalData } = useQuery<getProjects>(GET_PROJECTS, { variables: { type: 'PERSONAL' } });

  return (
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
        <PagePath data={path} />
        <SubTitleWrapper>
          <h2>제가 지금까지 진행한 프로젝트들 입니다.</h2>
          {userInfo?.isLoggedIn.userName && (
            <Link href="/portfolio/add">
              <a>
                <button>프로젝트 추가</button>
              </a>
            </Link>
          )}
        </SubTitleWrapper>
        {groupData?.GetProjects?.project && groupData.GetProjects.project.length !== 0 && (
          <>
            <Title>그룹 프로젝트</Title>
            <ProjectListWrapper>
              {groupData.GetProjects.project.map((v) => (
                <ProjectCard key={`group_project${v.id}`} projectInfo={v} />
              ))}
            </ProjectListWrapper>
          </>
        )}
        {personalData?.GetProjects?.project && (
          <>
            <Title>개인 프로젝트</Title>
            <ProjectListWrapper>
              {personalData.GetProjects.project.map((v) => (
                <ProjectCard key={`personal_project${v.id}`} projectInfo={v} />
              ))}
            </ProjectListWrapper>
          </>
        )}
      </PageContainer>
    </>
  );
};

export default Portfolio;
