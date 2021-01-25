import {
  Button,
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const alertStyles = makeStyles((theme) => ({
  postInfo: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2)
  }
}))

function AlertModal ({ open, setOpen, postInfo }) {
  const classes = alertStyles()

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    window.fetch(`https://jsonplaceholder.typicode.com/posts/${postInfo.id}`, {
      method: 'DELETE'
    })
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Tem certeza?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Você está prestes a deletar:
        </DialogContentText>
        <Box className={classes.postInfo}>
          <DialogContentText variant='subtitle2'>{postInfo.title}</DialogContentText>
          <DialogContentText variant='body2'>{postInfo.body}</DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleDelete} color='primary'>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal
