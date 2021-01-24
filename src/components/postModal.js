import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Box,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import InsertComment from '@material-ui/icons/InsertComment'
import * as yup from 'yup'
import { useFormik } from 'formik'

const postValidation = yup.object().shape({
  title: yup.string('Adicione um título').required('Título é obrigatório'),
  body: yup.string('Digite o conteúdo do seu post').required('Conteúdo do post obrigatório')
})

const commentsValidation = yup.object().shape({
  name: yup.string('Adicione seu nome').required('nome é obrigatorio'),
  email: yup
    .string('Adicione seu email')
    .email('Email deve ser válido')
    .required('Email é obrigatorio')
})

const postModalStyles = makeStyles({
  modalContentText: {
    marginBottom: 0
  },
  addCommentButton: {
    margin: '16px 0'
  }
})

function PostModal ({ open, setOpen, modalTitle, formData }) {
  const [showCommentsForm, setShowCommentsForm] = useState(false)
  const classes = postModalStyles()

  const handleClose = () => {
    setOpen(false)
    setShowCommentsForm(false)
  }

  const formikPostForm = useFormik({
    postValidation,
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

  const formikCommentsForm = useFormik({
    commentsValidation,
    initialValues: {
      name: '',
      email: '',
      comment: ''
    },
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2)) // eslint-disable-line
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
      <form onSubmit={formikPostForm.handleSubmit}>
        <DialogContent>
          <DialogContentText className={classes.modalContentText} variant='subtitle2'>Post</DialogContentText>
          <TextField
            autoFocus
            margin='none'
            id='title'
            label='Título'
            type='text'
            fullWidth
            value={formikPostForm.values.title}
            onChange={formikPostForm.handleChange}
            onBlur={formikPostForm.handleBlur}
            error={formikPostForm.touched.title && Boolean(formikPostForm.errors.title)}
            helperText={formikPostForm.touched.title && formikPostForm.errors.title}
          />
          <TextField
            margin='dense'
            id='body'
            multiline
            variant='filled'
            rows={3}
            label='Conteúdo'
            type='text'
            fullWidth
            value={formikPostForm.values.body}
            onChange={formikPostForm.handleChange}
            onBlur={formikPostForm.handleBlur}
            error={formikPostForm.touched.body && Boolean(formikPostForm.errors.body)}
            helperText={formikPostForm.touched.body && formikPostForm.errors.body}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          {modalTitle === 'Criar' && (
            <Button disabled={Boolean(formikPostForm.errors.body)} type='submit'>
              Salvar e Continuar
            </Button>
          )}
          <Button disabled={Boolean(formikPostForm.errors.body)} onClick={handleClose} color='primary' type='submit'>
            Salvar
          </Button>
        </DialogActions>
      </form>

      <form onSubmit={formikCommentsForm.handleSubmit}>
        <DialogContent>
          <DialogContentText className={classes.modalContentText} variant='subtitle2'>Comentários</DialogContentText>

          {!showCommentsForm && (
            <Button
              startIcon={<InsertComment />}
              size='large'
              fullWidth
              variant='contained'
              color='secondary'
              disableElevation
              className={classes.addCommentButton}
              onClick={() => setShowCommentsForm(true)}
            >
              Adicionar comentario
            </Button>
          )}

          {showCommentsForm && (
            <>
              <Box display='flex' justifyContent='space-between'>
                <TextField
                  autoFocus
                  margin='none'
                  id='name'
                  label='Nome'
                  type='text'
                  value={formikCommentsForm.values.title}
                  onChange={formikCommentsForm.handleChange}
                  onBlur={formikCommentsForm.handleBlur}
                  error={formikCommentsForm.touched.title && Boolean(formikCommentsForm.errors.title)}
                  helperText={formikCommentsForm.touched.title && formikCommentsForm.errors.title}
                />
                <TextField
                  margin='none'
                  id='email'
                  label='Email'
                  type='email'
                  value={formikCommentsForm.values.title}
                  onChange={formikCommentsForm.handleChange}
                  onBlur={formikCommentsForm.handleBlur}
                  error={formikCommentsForm.touched.title && Boolean(formikCommentsForm.errors.title)}
                  helperText={formikCommentsForm.touched.title && formikCommentsForm.errors.title}
                />
              </Box>
              <TextField
                margin='dense'
                id='comment'
                multiline
                variant='filled'
                rows={2}
                label='Comentário'
                type='text'
                fullWidth
                value={formikCommentsForm.values.comment}
                onChange={formikCommentsForm.handleChange}
                onBlur={formikCommentsForm.handleBlur}
                error={formikCommentsForm.touched.comment && Boolean(formikCommentsForm.errors.comment)}
                helperText={formikCommentsForm.touched.comment && formikCommentsForm.errors.comment}
              />
            </>
          )}

        </DialogContent>
        {showCommentsForm && (
          <DialogActions>
            <Button onClick={() => setShowCommentsForm(false)}>
              Cancelar
            </Button>
            <Button disabled={Boolean(formikCommentsForm.errors.body)} onClick={handleClose} color='primary' type='submit'>
              Salvar
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  )
}

export default PostModal
