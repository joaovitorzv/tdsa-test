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
          Você está prestes a deletar
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
        <Button onClick={handleClose} color='primary'>
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal
