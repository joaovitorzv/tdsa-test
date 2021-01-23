import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

function AlertModal ({ open, setOpen }) {
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
      <DialogTitle id='alert-dialog-title'>Tem certeza que deseja deletar?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Aqui esta sobre o post maluco safe do brafe
        </DialogContentText>
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
