import gql from 'graphql-tag';

export const WRITE_POST = gql`
  mutation writePost(
    $category: PostCategory!
    $title: String!
    $content: String!
    $titleImage: String
    $tags: [String]
  ) {
    WritePost(category: $category, title: $title, content: $content, titleImage: $titleImage, tags: $tags) {
      ok
      error
    }
  }
`;
