import { createContext, useState } from 'react'

export const PostsContext = createContext(null)

const { Provider } = PostsContext

function PostsProvider ({ children }) {
  const [state, setState] = useState([])

  return <Provider value={[state, setState]}>{children}</Provider>
}
PostsProvider.context = PostsContext

export default PostsProvider
