/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShoe = /* GraphQL */ `
  mutation CreateShoe(
    $input: CreateShoeInput!
    $condition: ModelShoeConditionInput
  ) {
    createShoe(input: $input, condition: $condition) {
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
export const updateShoe = /* GraphQL */ `
  mutation UpdateShoe(
    $input: UpdateShoeInput!
    $condition: ModelShoeConditionInput
  ) {
    updateShoe(input: $input, condition: $condition) {
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
export const deleteShoe = /* GraphQL */ `
  mutation DeleteShoe(
    $input: DeleteShoeInput!
    $condition: ModelShoeConditionInput
  ) {
    deleteShoe(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
