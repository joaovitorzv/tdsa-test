export function removePost (posts, postId) {
  return posts.filter(post => post.id !== postId)
}

export function addPost (posts, post) {
  return [...posts, post]
}
