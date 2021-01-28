import { useState } from 'react'
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
  }
}))

function Post ({ postData }) {
  const [openPostModal, setOpenPostModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const classes = postStyles()

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
        <Box className={classes.comment}>
          <Typography variant='subtitle2' component='h4' className={classes.userName}>@joaovitor</Typography>
          <Typography variant='body2' component='h4'>just commenting some nothing to test nothing thinking about nothing this all are nothing</Typography>
        </Box>

        <Box className={classes.comment}>
          <Typography variant='subtitle2' component='h4' className={classes.userName}>@joaovitor</Typography>
          <Typography variant='body2' component='h4'>just commenting some nothing to test nothing just commenting some nothing to test nothing just commenting some nothing to test nothing thinking about nothing this all are nothing</Typography>
        </Box>

        <Box className={classes.comment}>
          <Typography variant='subtitle2' component='h4' className={classes.userName}>@joaovitor</Typography>
          <Typography variant='body2' component='h4'>just commenting some nothing to test nothing thinking about nothing this all are nothing</Typography>
        </Box>
      </Box>

    </Grid>
  )
}

export default Post
