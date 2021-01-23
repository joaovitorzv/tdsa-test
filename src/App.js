import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'

import Post from './components/post'

const postStyles = makeStyles((theme) => ({
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

function App () {
  const classes = postStyles()

  return (
    <Container maxWidth='xl' className={classes.root}>
      <Box className={classes.addPost}>
        <Typography variant='h4' component='h2' gutterBottom color='secondary'>Posts</Typography>

        <Button
          startIcon={<AddIcon />}
          size='large'
          variant='contained'
          color='secondary'
          disableElevation
        >
          Inserir novo post
        </Button>
      </Box>
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
