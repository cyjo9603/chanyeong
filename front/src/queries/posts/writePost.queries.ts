import { gql } from '@apollo/client';

export const WRITE_POST = gql`
  mutation WritePost(
    $category: PostCategory!
    $title: String!
    $content: String!
    $titleImage: String
    $tags: [String]
  ) {
    WritePost(
      category: $category
      title: $title
      content: $content
      titleImage: $titleImage
      tags: $tags
    ) {
      ok
      error
    }
  }
`;
