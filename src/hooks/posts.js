import { createContext, useState } from 'react'

export const PostsContext = createContext()

const { Provider } = PostsContext

function PostsProvider ({ children }) {
  const [posts, setPosts] = useState([])

  const addPosts = (post) => {
    setPosts({
      posts: [...posts, post]
    })
  }

  return (
    <Provider
      value={{
        posts,
        setPosts,
        addPosts
      }}
    >
      {children}
    </Provider>
  )
}
PostsProvider.context = PostsContext

export default PostsProvider
