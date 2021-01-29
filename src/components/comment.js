import {
  Box,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

const commentStyles = makeStyles((theme) => ({
  comment: {
    paddingTop: theme.spacing(1),
    fontSize: 12
  },
  userName: {
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.main,
    fontSize: 14
  }
}))

function Comment ({ comment }) {
  const classes = commentStyles()

  return (
    <Box className={classes.comment}>
      <Typography variant='subtitle2' component='h4' className={classes.userName}>{comment.email}</Typography>
      <Typography variant='body2' component='h4'>{comment.body}</Typography>
    </Box>
  )
}

export default Comment
