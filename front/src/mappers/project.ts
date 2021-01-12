import { GetSkills_GetSkills_skill as Skill } from '@gql-types/api';

export const addProjectMapper = (
  values: any,
  content: string,
  titleImage: string,
  skills: Skill[],
) => ({
  content,
  groupName: values.groupName || '',
  description: values.description,
  endDate: values.endDate || null,
  contribution: !values.contribution ? 0 : parseInt(values.contribution, 10),
  type: values.projectType,
  title: values.title,
  startDate: values.startDate,
  githubAddr: values.githubAddr || null,
  titleImage: titleImage || null,
  skillIds: skills.map((v) => v.id),
});

export const updateProjectMapper = (
  values: any,
  projectId: number,
  content: string,
  titleImage: string,
  deleteSkills: number[],
  skills: Skill[],
) => ({
  content,
  groupName: values.groupName || '',
  description: values.description,
  endDate: values.endDate || null,
  contribution: !values.contribution ? 0 : parseInt(values.contribution, 10),
  id: projectId,
  githubAddr: values.githubAddr || null,
  titleImage,
  deleteSkills,
  addSkills: skills.map((v) => v.id),
});
