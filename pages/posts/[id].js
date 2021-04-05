import { useState, useEffect } from 'react'
import { API, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'

import { listPosts, getPost } from '../../graphql/queries'

export default function Post({ post }) {
  const [coverImage, setCoverImage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const updateCoverImage = async () => {
      const imageKey = await Storage.get(post.coverImage)

      setCoverImage(imageKey)
    }
    if (post.coverImage) {
      updateCoverImage()
    }
  }, [post])

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">
        {post.title}
      </h1>
      {coverImage && (
        <div style={{ position: 'relative', width: '300px', height: '500px' }}>
          <img
            alt="Mountains"
            src={coverImage}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <p className="text-sm font-light my-4">by {post.username}</p>
      <div className="mt-8">
        <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const postData = await API.graphql({
    query: listPosts,
  })
  const paths = postData.data.listPosts.items.map((post) => ({
    params: { id: post.id },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const postData = await API.graphql({
    query: getPost,
    variables: { id },
  })
  return {
    props: {
      post: postData.data.getPost,
    },
    revalidate: 1,
  }
}
