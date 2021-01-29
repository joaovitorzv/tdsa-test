import { useContext } from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Box,
  IconButton,
  DialogContentText
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import InsertComment from '@material-ui/icons/InsertComment'
import { makeStyles } from '@material-ui/styles'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { PostsContext } from '../hooks/posts'

import Comment from './comment'

const commentsValidation = yup.object().shape({
  name: yup.string('Adicione seu nome').required('Nome é obrigatório'),
  email: yup
    .string('Adicione seu email')
    .email('Email deve ser válido')
    .required('Email é obrigatório'),
  comment: yup
    .string('Adicione um comentário')
    .min(3, 'Seu comentário deve ter no minímo 3 caracteres')
    .required('Comentário é obrigatório')
})

const commentFormStyles = makeStyles({
  modalContentText: {
    marginBottom: 0
  },
  addCommentButton: {
    margin: '16px 0'
  },
  deleteCommentButton: {
    borderRadius: 0
  }
})

function FormComment ({ open, setOpen, formData, modalAction, setShowCommentsForm, showCommentsForm }) {
  const { comments, loadComments, deleteComment, addComment } = useContext(PostsContext)
  const classes = commentFormStyles()

  const handleShowCommentsForm = () => {
    setShowCommentsForm(true)
  }

  const handleAddComment = (comment) => {
    addComment({
      postId: formData?.id,
      id: comments.length + 1,
      email: comment.email,
      body: comment.comment
    })
  }

  const formikCommentsForm = useFormik({
    validationSchema: commentsValidation,
    initialValues: {
      name: '',
      email: '',
      comment: ''
    },
    onSubmit: (values, { resetForm }) => {
      handleAddComment(values)
      resetForm({ values: '' })
    }
  })

  return (
    <form onSubmit={formikCommentsForm.handleSubmit}>
      <DialogContent>
        <DialogContentText className={classes.modalContentText} variant='subtitle2'>Comentários</DialogContentText>
        {loadComments(formData?.id)[0] && loadComments(formData?.id).map(comment => (
          <Box key={comment.id} display='flex' justifyContent='space-between'>
            <Comment comment={comment} />
            <IconButton
              className={classes.deleteCommentButton}
              aria-label='delete'
              color='primary'
              onClick={() => deleteComment(comment.id)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Box>
        ))}
        {!showCommentsForm && (
          <Button
            startIcon={<InsertComment />}
            size='large'
            fullWidth
            variant='contained'
            color='secondary'
            disableElevation
            className={classes.addCommentButton}
            onClick={handleShowCommentsForm}
          >
            Adicionar comentário
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
          <Button disabled={!formikCommentsForm.isValid} color='primary' type='submit'>
            Salvar
          </Button>
        </DialogActions>
      )}
    </form>
  )
}

export default FormComment
