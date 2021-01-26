import { useContext, createContext, useReducer } from 'react'

import { removePost, addPost } from './helpers/postsHelper'

const PostStateContext = createContext()
const PostDispatchContext = createContext()

function postReducer (state, action) {
  switch (action.type) {
    case 'removePost': {
      return { posts: addPost(state.posts, action.id) }
    }
    case 'addPost': {
      return { posts: removePost(state.posts, action.post) }
    }
    default:
      return state
  }
}

export function PostsProvider ({ children }) {
  const [state, dispatch] = useReducer(postReducer, { posts: [] })

  return (
    <PostStateContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  )
}

export function usePostState () {
  const context = useContext(PostStateContext)
  if (context === undefined) {
    throw new Error('usePostState must be whithin a PostProvider')
  }
  return context
}

export function usePostDispatch () {
  const context = useContext(PostDispatchContext)
  if (context === undefined) {
    throw new Error('usePostDispatch must be whithin a PostProvider')
  }
  return context
}
