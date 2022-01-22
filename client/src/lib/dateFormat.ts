const dateFormat = (dateValue: string) => {
  const result = new Date(dateValue).toISOString().slice(0, 10).split('-').join(' / ');
  return result;
};

export default dateFormat;
