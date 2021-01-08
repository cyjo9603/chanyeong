export const addSkillMapper = (values: any, image: string) => ({
  name: values.name,
  description: values.description,
  level: Number(values.level),
  order: Number(values.order),
  type: values.type,
  icon: image,
});

export const updateSkillMapper = (values: any, image: string, id: number) => ({
  id,
  name: values.name,
  type: values.type,
  level: Number(values.level),
  description: values.number,
  icon: image,
  order: Number(values.order),
});
