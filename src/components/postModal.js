import { useState, useContext } from 'react'
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
import InsertComment from '@material-ui/icons/InsertComment'
import { makeStyles } from '@material-ui/styles'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { PostsContext } from '../hooks/posts'

const postValidation = yup.object().shape({
  title: yup.string('Adicione um título').required('Título é obrigatório'),
  body: yup.string('Digite o conteúdo do seu post').required('Conteúdo do post obrigatório')
})

const commentsValidation = yup.object().shape({
  name: yup.string('Adicione seu nome').required('Nome é obrigatorio'),
  email: yup
    .string('Adicione seu email')
    .email('Email deve ser válido')
    .required('Email é obrigatorio'),
  comment: yup
    .string('Adicione um comentário')
    .min(3, 'Seu comentário deve ter no minímo 3 caracteres')
    .required('Comentário é obrigatório')
})

const postModalStyles = makeStyles({

  modalContentText: {
    marginBottom: 0
  },
  addCommentButton: {
    margin: '16px 0'
  }
})

function PostModal ({ open, setOpen, modalTitle, formData, modalAction }) {
  const { posts, addPost, updatePost } = useContext(PostsContext)
  const [showCommentsForm, setShowCommentsForm] = useState(false)
  const classes = postModalStyles()

  const handleClose = () => {
    setOpen(false)
    setShowCommentsForm(false)
  }

  const handleAddPost = (post) => {
    addPost({
      userId: 1,
      id: posts.length + 1,
      title: post.title,
      body: post.body
    })
  }

  const handleUpdatePost = (updateValues) => {
    updatePost(formData.id, updateValues)
  }

  const formikPostForm = useFormik({
    enableReinitialize: true,
    validationSchema: postValidation,
    initialValues: {
      title: formData?.title || '',
      body: formData?.body || ''
    },
    onSubmit: (values, { resetForm }) => {
      modalAction === 'create'
        ? handleAddPost(values)
        : handleUpdatePost(values)

      resetForm({ values: '' })
    }
  })

  const formikCommentsForm = useFormik({
    validationSchema: commentsValidation,
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
          {modalAction === 'create' && (
            <Button disabled={!formikPostForm.isValid} type='submit'>
              Salvar e Continuar
            </Button>
          )}
          <Button disabled={!formikPostForm.isValid} onClick={handleClose} color='primary' type='submit'>
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
                  value={formikCommentsForm.values.name}
                  onChange={formikCommentsForm.handleChange}
                  onBlur={formikCommentsForm.handleBlur}
                  error={formikCommentsForm.touched.name && Boolean(formikCommentsForm.errors.name)}
                  helperText={formikCommentsForm.touched.name && formikCommentsForm.errors.name}
                />
                <TextField
                  margin='none'
                  id='email'
                  label='Email'
                  type='email'
                  value={formikCommentsForm.values.email}
                  onChange={formikCommentsForm.handleChange}
                  onBlur={formikCommentsForm.handleBlur}
                  error={formikCommentsForm.touched.email && Boolean(formikCommentsForm.errors.email)}
                  helperText={formikCommentsForm.touched.email && formikCommentsForm.errors.email}
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
            <Button disabled={!formikCommentsForm.isValid} onClick={handleClose} color='primary' type='submit'>
              Salvar
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  )
}

export default PostModal
