export const BLOGS_QUERY = `#graphql
  query Blogs(
    $language: LanguageCode
    $handle: String!
  ) @inContext(language: $language) {
    blog(handle: $handle) {
          title
          handle
          articles(first: 10) {
            edges {
              node {
                id
                contentHtml
                content
                title
                handle
                image {
                  height
                  url
                }
              }
            }
          }
    }
  }
`;
