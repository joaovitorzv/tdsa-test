import { useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import AlertModal from './alertModal'
import PostModal from './postModal'

const postStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderColor: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1)
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
    </Grid>
  )
}

export default Post
