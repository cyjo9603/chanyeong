import React from 'react';
import { Helmet } from 'react-helmet';

import PageContainer from '../../component/pageContainer';
import PagePath from '../../component/PagePath';
import { Title, SubTitle, SkillListWrapper } from './styled';
import AboutSkill from '../../component/AboutSkill';
import Button from '../../component/Button';
import { getSkills_GetSkills_skill } from '../../types/api';
import { LocalSignIn } from '../../apollo';
import UpdateSkillForm from '../../component/UpdateSkillForm';

interface Props {
  openAddSkill: boolean;
  userInfo?: LocalSignIn;
  frontSkills: getSkills_GetSkills_skill[];
  backSkills: getSkills_GetSkills_skill[];
  devopsSkills: getSkills_GetSkills_skill[];
  editSkillData: getSkills_GetSkills_skill;
  onClickAddSkill: () => void;
  onClickEditSkill: (data: getSkills_GetSkills_skill) => void;
  closeUpdateSKill: () => void;
}

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/skill', name: 'SKILL' },
];

const SkillPresenter = ({
  closeUpdateSKill,
  openAddSkill,
  onClickAddSkill,
  onClickEditSkill,
  userInfo,
  frontSkills,
  backSkills,
  devopsSkills,
  editSkillData,
}: Props) => (
  <>
    {openAddSkill && <UpdateSkillForm closeUpdateSkill={closeUpdateSKill} editSkillData={editSkillData} />}
    <Helmet>
      <title>기술 :: chanyeong</title>
      <meta
        name="description"
        content="개발자 조찬영에 대해 소개하는 페이지 입니다. 개발을 진행하며 사용할 수 있는 기술들과 도구들에 대해 설명해 놓았습니다."
      />
      <meta name="og:title" content="기술 :: chanyeong" />
      <meta
        name="og:description"
        content="개발자 조찬영에 대해 소개하는 페이지 입니다. 개발을 진행하며 사용할 수 있는 기술들과 도구들에 대해 설명해 놓았습니다."
      />
    </Helmet>
    <PageContainer>
      <PagePath data={path} page="about" />
      <SubTitle>제가 개발을 진행하며 사용하는 기술 및 도구입니다.</SubTitle>
      <div>
        {userInfo?.isLoggedIn.userName && <Button onClick={onClickAddSkill} name="스킬 추가" align="right" />}
        <Title>Skill Stak</Title>
      </div>
      <SubTitle>Front-End</SubTitle>
      <SkillListWrapper>
        {frontSkills?.map((v) => (
          <AboutSkill
            key={`about_front_skill${v.id}`}
            data={v}
            onClick={userInfo?.isLoggedIn.userName && onClickEditSkill}
          />
        ))}
      </SkillListWrapper>
      <SubTitle>Back-End</SubTitle>
      <SkillListWrapper>
        {backSkills?.map((v) => (
          <AboutSkill
            key={`about_back_skill${v.id}`}
            data={v}
            onClick={userInfo?.isLoggedIn.userName && onClickEditSkill}
          />
        ))}
      </SkillListWrapper>
      <SubTitle>DevOps</SubTitle>
      <SkillListWrapper>
        {devopsSkills?.map((v) => (
          <AboutSkill
            key={`about_devops_skill${v.id}`}
            data={v}
            onClick={userInfo?.isLoggedIn.userName && onClickEditSkill}
          />
        ))}
      </SkillListWrapper>
    </PageContainer>
  </>
);

export default SkillPresenter;
