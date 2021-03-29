/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getShoe = /* GraphQL */ `
  query GetShoe($id: ID!) {
    getShoe(id: $id) {
      id
      name
      brand
      price
      link
      categories
      createdAt
      updatedAt
    }
  }
`;
export const listShoes = /* GraphQL */ `
  query ListShoes(
    $filter: ModelShoeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShoes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        brand
        price
        link
        categories
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      username
      coverImage
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        username
        coverImage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByUsername = /* GraphQL */ `
  query PostsByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        username
        coverImage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
