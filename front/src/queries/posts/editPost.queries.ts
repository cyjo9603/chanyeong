import { gql } from '@apollo/client';

export const EDIT_POST = gql`
  mutation EditPost(
    $id: Int!
    $category: PostCategory
    $title: String
    $content: String
    $titleImage: String
    $deleteTags: [Int]
    $addTags: [String]
  ) {
    EditPost(
      id: $id
      category: $category
      title: $title
      content: $content
      titleImage: $titleImage
      deleteTags: $deleteTags
      addTags: $addTags
    ) {
      ok
      error
    }
  }
`;
