import { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Box
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

import AlertModal from './alertModal'
import PostModal from './postModal'

const postStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderColor: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.paper
  },
  postTitle: {
    variant: 'subtitle1',
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
  postActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2)
  },
  comments: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  comment: {
    paddingTop: theme.spacing(1),
    fontSize: 12
  },
  userName: {
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.main,
    fontSize: 14
  },
  addComment: {
    marginTop: theme.spacing(2)
  }
}))

function Post ({ postData }) {
  const [comments, setComments] = useState([])
  const [openPostModal, setOpenPostModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const classes = postStyles()

  useEffect(() => {
    window.fetch(`https://jsonplaceholder.typicode.com/posts/${postData.id}/comments`)
      .then((response) => response.json())
      .then((json) => setComments(json))
  }, [])

  return (
    <Grid item xs={12}>
      <Box border={1} className={classes.root}>
        <Typography className={classes.postTitle}>{postData.title}</Typography>
        <Typography className={classes.postBody}>{postData.body}</Typography>

        <Box className={classes.postActions}>
          <Button
            color='primary'
            size='small'
            variant='text'
            onClick={() => setOpenPostModal(true)}
          >
            Editar
          </Button>
          <PostModal
            formData={postData}
            modalAction='edit'
            modalTitle='Editar'
            open={openPostModal}
            setOpen={setOpenPostModal}
          />
          <IconButton
            aria-label='delete'
            onClick={() => setOpenDeleteModal(true)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
          <AlertModal postInfo={postData} open={openDeleteModal} setOpen={setOpenDeleteModal} />
        </Box>
      </Box>
      <Box className={classes.comments}>
        <Typography variant='subtitle2' component='h3'>COMENTÁRIOS</Typography>
        {comments[0]
          ? comments.map(comment => (
            <Box className={classes.comment} key={comment.id}>
              <Typography variant='subtitle2' component='h4' className={classes.userName}>{comment.email}</Typography>
              <Typography variant='body2' component='h4'>{comment.body}</Typography>
            </Box>
            ))
          : (
            <Typography variant='subtitle2' component='h4'>Carregando...</Typography>
            )}
      </Box>
    </Grid>
  )
}

export default Post
