import { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'

import Post from './components/post'
import PostModal from './components/postModal'

import PostsProvider from './hooks/posts'

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
//   {
//     id: '1',
//     title: 'Post title mock 1',
//     body: 'Post body bla bla bla writing some nothing to test hahaohohaoahaoh'
//   },
//   {
//     id: '2',
//     title: 'Post title mock 3',
//     body: 'Post body bla bla bla writing some nothing to test hahaohohaoahaoh'
//   },
//   {
//     id: '3',
//     title: 'Post title mock 2',
//     body: 'Post body bla bla bla writing some nothing to test hahaohohaoahaoh'
//   },
//   {
//     id: '4',
//     title: 'Post title mock 4',
//     body: 'Post body bla bla bla writing some nothing to test hahaohohaoahaoh'
//   },
//   {
//     id: '5',
//     title: 'Post title mock 5',
//     body: 'Post body bla bla bla writing some nothing to test hahaohohaoahaoh'
//   },
//   {
//     id: '6',
//     title: 'Post title mock 6',
//     body: 'Post body bla bla bla writing some nothing to test hahaohohaoahaoh'
//   }
// ]

function App () {
  const [posts, setPosts] = useState([])
  const [openComposeModal, setOpenComposeModal] = useState(false)
  const classes = appStyles()

  useEffect(() => {
    window.fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json))
  }, [])

  return (
    <PostsProvider>
      <Container maxWidth='md' className={classes.root}>
        <Box className={classes.addPost}>
          <Typography variant='h4' component='h2' gutterBottom color='secondary'>Posts</Typography>
          <Button
            startIcon={<AddIcon />}
            size='large'
            variant='contained'
            color='secondary'
            disableElevation
            onClick={() => setOpenComposeModal(true)}
          >
            Inserir novo post
          </Button>
          <PostModal
            modalAction='create'
            modalTitle='Criar'
            open={openComposeModal}
            setOpen={setOpenComposeModal}
          />
        </Box>
        <Grid container spacing={1} p={2}>
          {posts[0]
            ? posts.map(post => (
              <Post key={post.id} postData={post} />
              ))
            : (<Typography variant='h1' component='h2'>Carregando</Typography>)}
        </Grid>
      </Container>
    </PostsProvider>
  )
}

export default App
