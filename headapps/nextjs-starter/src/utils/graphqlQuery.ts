import { gql } from 'graphql-request';

export const LATEST_BLOGS = gql`
  query BlogSearch(
    $templateId: String
    $path: String
    $first: Int
    $after: String
    $sortOrder: OrderByDirection
  ) {
    search(
      where: {
        AND: [
          { name: "_path", value: $path }
          { name: "_templates", value: $templateId }
          { name: "isArchived", value: "1", operator: NEQ }
        ]
      }
      orderBy: { name: "publishDate", direction: $sortOrder }
      first: $first
      after: $after
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results {
        cardImage: field(name: "cardImage") {
          ... on ImageField {
            src
            alt
          }
        }
        publishDate: field(name: "publishDate") {
          ... on DateField {
            value: formattedDateValue
          }
        }
        blogTitle: field(name: "blogTitle") {
          ... on TextField {
            value
          }
        }

        pageTitle: field(name: "Title") {
          ... on TextField {
            value
          }
        }

        shortDescription: field(name: "shortDescription") {
          ... on TextField {
            value
          }
        }

        goToBlog: url {
          path
        }
      }
    }
  }
`;

export const GET_CURSOR = gql`
  query BlogSearch($templateId: String, $path: String, $first: Int, $sortOrder: OrderByDirection) {
    search(
      where: {
        AND: [
          { name: "_path", value: $path }
          { name: "_templates", value: $templateId }
          { name: "isArchived", value: "1", operator: NEQ }
        ]
      }
      orderBy: { name: "publishDate", direction: $sortOrder }
      first: $first
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
    }
  }
`;

export const ARCHIVED_BLOGS = gql`
  query BlogSearch($templateId: String, $path: String) {
    search(
      where: {
        AND: [
          { name: "_path", value: $path }
          { name: "_templates", value: $templateId }
          { name: "isArchived", value: "1", operator: EQ }
        ]
      }
    ) {
      results {
        cardImage: field(name: "cardImage") {
          ... on ImageField {
            src
            alt
          }
        }
        publishDate: field(name: "publishDate") {
          ... on DateField {
            value: formattedDateValue
          }
        }
        blogTitle: field(name: "blogTitle") {
          ... on TextField {
            value
          }
        }

        pageTitle: field(name: "Title") {
          ... on TextField {
            value
          }
        }

        shortDescription: field(name: "shortDescription") {
          ... on TextField {
            value
          }
        }

        goToBlog: url {
          path
        }
      }
    }
  }
`;

export const FEATURED_BLOGS = gql`
  query BlogSearch($templateId: String, $path: String) {
    search(
      where: {
        AND: [
          { name: "_path", value: $path }
          { name: "_templates", value: $templateId }
          { name: "isFeatured", value: "1", operator: EQ }
        ]
      }
    ) {
      results {
        cardImage: field(name: "cardImage") {
          ... on ImageField {
            src
            alt
          }
        }

        blogTitle: field(name: "blogTitle") {
          ... on TextField {
            value
          }
        }
        publishDate: field(name: "publishDate") {
          ... on DateField {
            value: formattedDateValue
          }
        }
        pageTitle: field(name: "Title") {
          ... on TextField {
            value
          }
        }

        shortDescription: field(name: "shortDescription") {
          ... on TextField {
            value
          }
        }

        goToBlog: url {
          path
        }
      }
    }
  }
`;
