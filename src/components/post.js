import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const postStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderColor: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.paper
  },
  postTitle: {
    variant: 'subtitle2',
    color: theme.palette.secondary.main,
    component: 'h3',
    fontSize: 18,
    fontWeight: 'bold'
  },
  postBody: {
    variant: 'body1',
    color: theme.palette.secondary.main,
    fontSize: 14
  },
  button: {
    color: theme.palette.primary.main
  }
}))

function Post () {
  const classes = postStyles()

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box border={1} className={classes.root}>
        <Typography className={classes.postTitle}>Teste maluco</Typography>
        <Typography className={classes.postBody}>Aqui esta tudo sobre o post maluco safe do brafe</Typography>

        <Box display='flex' justifyContent='space-between'>
          <Button size='small' variant='text' className={classes.button}>Editar</Button>
          <IconButton aria-label='delete'>
            <DeleteIcon fontSize='small' color='secondary' />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  )
}

export default Post
