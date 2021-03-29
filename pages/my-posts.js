import { useEffect, useState } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import { postsByUsername } from '../graphql/queries'
import { deletePost as deletePostMutation } from '../graphql/mutations'

const MyPosts = () => {
  const [posts, setPosts] = useState([])

  const fetchUserPosts = async () => {
    const { username } = await Auth.currentAuthenticatedUser()
    const userPosts = await API.graphql({
      query: postsByUsername,
      variables: { username },
    })
    setPosts(userPosts.data.postsByUsername.items)
  }
  useEffect(() => {
    fetchUserPosts()
  }, [])

  const deletePost = async (id) => {
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id } },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
    fetchUserPosts()
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        My Posts
      </h1>
      {posts.map((post) => (
        <div key={post.id} className="border-b border-gray-300 mt-8 pb-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-500 mt-2">Author: {post.username}</p>
          <Link href={`/posts/${post.id}`}>View Post</Link>
          <Link href={`/edit-posts/${post.id}`}>Edit Post</Link>
          <button
            type="button"
            className="text-sm mr-4 text-red-500"
            onClick={() => deletePost(post.id)}
          >
            Delete Post
          </button>
        </div>
      ))}
    </div>
  )
}

export default MyPosts
