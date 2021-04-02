import { useEffect, useState, useRef } from 'react'
import { API, Storage } from 'aws-amplify'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { updatePost } from '../../graphql/mutations'
import { getPost } from '../../graphql/queries'

const EditPost = () => {
  const [post, setPost] = useState({})

  const [coverImage, setCoverImage] = useState(null)
  const [localImage, setLocalImage] = useState(null)
  const hiddenFileInput = useRef(null)
  const { content, title } = post
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    const getCoverImage = async (imageId) => {
      const imageKey = await Storage.get(imageId)
      setCoverImage(imageKey)
    }
    async function fetchPost() {
      if (!id) return
      const postData = await API.graphql({
        query: getPost,
        variables: { id },
      })
      const postResponse = postData.data.getPost
      if (postResponse.coverImage) {
        getCoverImage(postResponse.coverImage)
      }
      setPost(postResponse)
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
    let fileName
    if (localImage) {
      fileName = `${localImage.name}_${uuid()}`
      post.coverImage = fileName
      await Storage.put(fileName, localImage)
    }
    await API.graphql({
      query: updatePost,
      variables: {
        input: {
          title,
          content,
          id,
          ...(fileName && { coverImage: fileName }),
        },
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })
    router.push('/my-posts')
  }
  async function uploadImage() {
    hiddenFileInput.current.click()
  }
  function handleChange(e) {
    const fileUploaded = e.target.files[0]
    if (!fileUploaded) return
    setLocalImage(fileUploaded)
  }

  const imgSrc = localImage ? URL.createObjectURL(localImage) : coverImage
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        Edit post
      </h1>
      {imgSrc && <img alt="imgSrc" src={imgSrc} width={300} height={200} />}
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
      <input
        type="file"
        ref={hiddenFileInput}
        className="absolute w-0 h-0"
        onChange={handleChange}
      />
      <button
        type="button"
        className="bg-purple-600 text-white font-semibold px-8 py-2 rounded-lg mr-2"
        onClick={uploadImage}
      >
        Upload Cover Image
      </button>
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
