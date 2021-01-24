import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle
} from '@material-ui/core'

function PostModal ({ open, setOpen }) {
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
      <DialogTitle id='alert-dialog-title'>Criar</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            margin='dense'
            id='postTitle'
            label='Titulo do post'
            type='text'
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='postBody'
            multiline
            variant='filled'
            rows={6}
            label='Conteudo do post'
            type='text'
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleClose} color='primary'>
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PostModal
