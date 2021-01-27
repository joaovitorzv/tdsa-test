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

  const deletePost = (postId) => {
    setPosts((prevState) => [
      ...prevState.filter(id => id !== postId)
    ])
  }

  return (
    <Provider
      value={{
        posts,
        setPosts,
        addPost,
        deletePost
      }}
    >
      {children}
    </Provider>
  )
}
PostsProvider.context = PostsContext

export default PostsProvider
