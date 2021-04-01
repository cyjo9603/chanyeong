import { makeVar } from '@apollo/client';

interface BlogCategory {
  category: string | null;
  tagId: number | null;
}

export const blogCategoryVar = makeVar<BlogCategory>({
  category: null,
  tagId: null,
});

export const setTagId = (tagId: number | null = null) => {
  const currentCategory = blogCategoryVar();
  blogCategoryVar({ ...currentCategory, tagId });
};
