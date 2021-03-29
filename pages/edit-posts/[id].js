import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import { useRouter } from 'next/router'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { updatePost } from '../../graphql/mutations'
import { getPost } from '../../graphql/queries'

const EditPost = () => {
  const [post, setPost] = useState({})
  const { content, title } = post
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    async function fetchPost() {
      if (!id) return
      const postData = await API.graphql({
        query: getPost,
        variables: { id },
      })
      setPost(postData.data.getPost)
    }
    fetchPost()
  }, [id])
  if (!post) return null

  const onChange = (e) => {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }))
  }

  const updateCurrentPost = async () => {
    if (!title || !content) return
    await API.graphql({
      query: updatePost,
      variables: { input: { title, content, id } },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
    router.push('/my-posts')
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        Edit post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={updateCurrentPost}
      >
        Update Post
      </button>
    </div>
  )
}
export default EditPost
