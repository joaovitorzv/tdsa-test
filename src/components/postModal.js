import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle
} from '@material-ui/core'
import * as yup from 'yup'
import { useFormik } from 'formik'

const validationSchema = yup.object().shape({
  title: yup.string('Adicione um título').required('Título é obrigatório'),
  body: yup.string('Digite o conteúdo do seu post').required('Conteúdo do post obrigatório')
})

function PostModal ({ open, setOpen, modalTitle, formData }) {
  const handleClose = () => {
    setOpen(false)
  }

  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: formData?.title || '',
      body: formData?.body || ''
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2)) // eslint-disable-line
      resetForm({ values: '' })
    }
  })

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{modalTitle}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Titulo do post'
            type='text'
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin='dense'
            id='body'
            multiline
            variant='filled'
            rows={6}
            label='Conteúdo do post'
            type='text'
            fullWidth
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          {modalTitle === 'Criar' && (
            <Button type='submit'>
              Salvar e Continuar
            </Button>
          )}
          <Button disabled={Boolean(formik.errors.body)} onClick={handleClose} color='primary' type='submit'>
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default PostModal
