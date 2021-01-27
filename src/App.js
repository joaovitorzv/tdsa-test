import { useContext, useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'

import Post from './components/post'
import PostModal from './components/postModal'

import { PostsContext } from './hooks/posts'

const appStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2%'
  },
  addPost: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }
}))

// const postsMock = [
//
// ]

function App () {
  const { posts, setPosts } = useContext(PostsContext)
  const [openPostsModal, setOpenPostsModal] = useState(false)

  const classes = appStyles()

  useEffect(() => {
    const fetchPosts = () => {
      window.fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => setPosts(json.reverse()))
    }

    fetchPosts()
  }, [])

  return (
    <Container maxWidth='md' className={classes.root}>
      <Box className={classes.addPost}>
        <Typography variant='h4' component='h2' gutterBottom color='secondary'>Posts</Typography>
        <Button
          startIcon={<AddIcon />}
          size='large'
          variant='contained'
          color='secondary'
          disableElevation
          onClick={() => setOpenPostsModal(true)}
        >
          Inserir novo post
        </Button>
        <PostModal
          modalAction='create'
          modalTitle='Criar'
          open={openPostsModal}
          setOpen={setOpenPostsModal}
        />
      </Box>
      <Grid container spacing={1} p={2}>
        {posts[0]
          ? posts.reverse().map(post => (
            <Post key={post.id} postData={post} />
            ))
          : (<Typography variant='h1' component='h2'>Carregando</Typography>)}
      </Grid>
    </Container>
  )
}

export default App
