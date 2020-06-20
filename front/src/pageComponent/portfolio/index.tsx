import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';

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
      {groupData?.GetProjects?.project && (
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
  );
};

export default Portfolio;
