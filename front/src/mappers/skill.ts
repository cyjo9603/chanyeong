export const addSkillMapper = (values: any, image: string) => ({
  name: values.name,
  description: values.description,
  level: Number(values.level),
  order: Number(values.order),
  type: values.type,
  icon: image,
});
