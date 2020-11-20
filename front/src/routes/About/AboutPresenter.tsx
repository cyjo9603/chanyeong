import React from 'react';
import { Helmet } from 'react-helmet';

import styled from '@theme/styled';
import RowFrame from '@frames/RowFrame';
import BreadCrumbs from '@molecules/BreadCrumbs';
import AboutSkillList from '@organisms/AboutSKillList';
import ExperienceCard from '@organisms/ExperienceCard';
import WorkProcess from '@organisms/WorkProcess';
import Button from '@atoms/Button';
import Title from '@atoms/Title';
import SubTitle, { SUBTITLE_WEIGHT_BOLD } from '@atoms/SubTitle';
import {
  getSkills_GetSkills_skill,
  getAbouts_GetExperiences_experiences,
} from '@gql-types/api';
import UpdateSkillForm from '@component/UpdateSkillForm';
import { LocalSignIn } from '@src/apollo';
import AboutValueList from './AboutValueList';

interface Props {
  openAddSkill: boolean;
  userInfo?: LocalSignIn;
  frontSkills: getSkills_GetSkills_skill[];
  backSkills: getSkills_GetSkills_skill[];
  devopsSkills: getSkills_GetSkills_skill[];
  experiences: getAbouts_GetExperiences_experiences[];
  editSkillData: getSkills_GetSkills_skill;
  onClickAddSkill: () => void;
  onClickEditSkill: (data: getSkills_GetSkills_skill) => void;
  closeUpdateSKill: () => void;
}

const StyledAbout = styled.section`
  padding-bottom: 20px 0;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.PRIMARY_FONT};
  & > span {
    font-size: 18px;
  }

  & .expreience-wrapper {
    margin: 90px 0 30px;
  }
`;

const path = [
  { path: '/', name: 'CHANYEONG' },
  { path: '/about', name: 'ABOUT' },
];

const AboutPresenter = ({
  closeUpdateSKill,
  openAddSkill,
  onClickAddSkill,
  onClickEditSkill,
  userInfo,
  frontSkills,
  backSkills,
  devopsSkills,
  experiences,
  editSkillData,
}: Props) => (
  <>
    {openAddSkill && (
      <UpdateSkillForm
        closeUpdateSkill={closeUpdateSKill}
        editSkillData={editSkillData}
      />
    )}
    <Helmet>
      <title>소개 :: chanyeong</title>
      <meta
        name="description"
        content="개발자 조찬영에 대해 소개하는 페이지 입니다. 제가 개발에 대해 어떤 가치관을 가지고 있고, 어떤 식으로 문제를 해결하며, 사용할 수 있는 기술들을 나열해 놓았습니다."
      />
      <meta name="og:title" content="소개 :: chanyeong" />
      <meta
        name="og:description"
        content="개발자 조찬영에 대해 소개하는 페이지 입니다. 제가 개발에 대해 어떤 가치관을 가지고 있고, 어떤 식으로 문제를 해결하며, 사용할 수 있는 기술들을 나열해 놓았습니다."
      />
    </Helmet>
    <RowFrame>
      <StyledAbout>
        <BreadCrumbs data={path} page="about" />
        <SubTitle text="안녕하세요! 저는 프론트엔드 개발자를 꿈꾸고 있는 조찬영입니다." />
        <Title text="Values" />
        <SubTitle text="제가 생각하는 개발의 중요한 포인트 세 가지는 다음과 같습니다." />
        <AboutValueList />
        <Title text="Work Process" />
        <WorkProcess />
        <div>
          {userInfo?.isLoggedIn.userName && (
            <Button onClick={onClickAddSkill} name="스킬 추가" align="right" />
          )}
          <Title text="Skill Stack" />
        </div>
        <SubTitle text="Front-End" weight={SUBTITLE_WEIGHT_BOLD} />
        <AboutSkillList skills={frontSkills} onClick={onClickEditSkill} />
        <SubTitle text="Back-End" weight={SUBTITLE_WEIGHT_BOLD} />
        <AboutSkillList skills={backSkills} onClick={onClickEditSkill} />
        <SubTitle text="DevOps" weight={SUBTITLE_WEIGHT_BOLD} />
        <AboutSkillList skills={devopsSkills} onClick={onClickEditSkill} />
        <div className="expreience-wrapper">
          <Title text="Experience" />
          {experiences.map((experience) => (
            <ExperienceCard
              key={`about_experience_${experience.id}`}
              experience={experience}
            />
          ))}
        </div>
      </StyledAbout>
    </RowFrame>
  </>
);

export default AboutPresenter;
