/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShoe = /* GraphQL */ `
  subscription OnCreateShoe {
    onCreateShoe {
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
export const onUpdateShoe = /* GraphQL */ `
  subscription OnUpdateShoe {
    onUpdateShoe {
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
export const onDeleteShoe = /* GraphQL */ `
  subscription OnDeleteShoe {
    onDeleteShoe {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($username: String) {
    onCreatePost(username: $username) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($username: String) {
    onUpdatePost(username: $username) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($username: String) {
    onDeletePost(username: $username) {
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
