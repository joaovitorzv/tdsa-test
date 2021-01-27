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

  return (
    <Provider
      value={{
        posts,
        setPosts,
        addPost
      }}
    >
      {children}
    </Provider>
  )
}
PostsProvider.context = PostsContext

export default PostsProvider
