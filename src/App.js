import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Post from './components/post'
import { Typography } from '@material-ui/core'

const postStyles = makeStyles({
  root: {
    paddingTop: '2%'
  }
})

function App () {
  const classes = postStyles()

  return (
    <Container maxWidth='xl' className={classes.root}>
      <Typography variant='h4' component='h2' gutterBottom color='secondary'>Posts</Typography>
      <Grid container spacing={1} p={2}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Grid>
    </Container>
  )
}

export default App
