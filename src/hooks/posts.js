import { createContext, useState } from 'react'

export const PostsContext = createContext()

const { Provider } = PostsContext

function PostsProvider ({ children }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: 1,
      title: 'fodase fodase',
      body: 'Fodase 1 teste'
    },
    {
      id: 2,
      userId: 2,
      title: 'fodase fodase',
      body: 'Fodase 1 teste'
    }
  ])
  const [comments, setComments] = useState([])

  const addPost = (post) => {
    setPosts((prevState) => [
      post,
      ...prevState
    ])
  }

  const updatePost = (postId, updateData) => {
    const postIndex = posts.findIndex(post => post.id === postId)
    const updatedPosts = [...posts]
    updatedPosts[postIndex] = {
      ...updatedPosts[postIndex],
      title: updateData.title,
      body: updateData.body
    }
    setPosts(updatedPosts)
  }

  const deletePost = (postId) => {
    setPosts((prevState) => [
      ...prevState.filter(post => post.id !== postId)
    ])
  }

  const loadComments = (postId) => {
    return comments.filter(postComments => postComments.postId === postId)
  }

  const addComment = (comment) => {
    setComments((prevState) => [
      comment,
      ...prevState
    ])
  }

  return (
    <Provider
      value={{
        posts,
        comments,
        setPosts,
        addPost,
        updatePost,
        deletePost,
        setComments,
        loadComments,
        addComment
      }}
    >
      {children}
    </Provider>
  )
}
PostsProvider.context = PostsContext

export default PostsProvider
