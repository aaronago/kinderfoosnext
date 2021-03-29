import { useEffect, useState } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import { postsByUsername } from '../graphql/queries'

const MyPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUserPosts = async () => {
      const { username } = await Auth.currentAuthenticatedUser()
      const userPosts = await API.graphql({
        query: postsByUsername,
        variables: { username },
      })
      setPosts(userPosts.data.postsByUsername.items)
    }

    fetchUserPosts()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        My Posts
      </h1>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <div className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 mt-2">Author: {post.username}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MyPosts
