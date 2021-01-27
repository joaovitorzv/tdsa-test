import { createContext, useState } from 'react'

export const PostsContext = createContext()

const { Provider } = PostsContext

function PostsProvider ({ children }) {
  const [posts, setPosts] = useState([])

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
    console.log(posts)
  }

  const deletePost = (postId) => {
    setPosts((prevState) => [
      ...prevState.filter(post => post.id !== postId)
    ])
  }

  return (
    <Provider
      value={{
        posts,
        setPosts,
        addPost,
        updatePost,
        deletePost
      }}
    >
      {children}
    </Provider>
  )
}
PostsProvider.context = PostsContext

export default PostsProvider
