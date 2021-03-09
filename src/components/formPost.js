import { useContext } from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  DialogContentText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { PostsContext } from '../hooks/posts'

const postValidation = yup.object().shape({
  title: yup.string('Adicione um título').required('Título é obrigatório'),
  body: yup.string('Digite o conteúdo do seu post').required('Conteúdo do post obrigatório')
})

const postModalStyles = makeStyles({
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

function FormPost ({ handleClose, formData, modalAction, bindSubmitFormPost, setCommentPostId }) {
  const { addPost, updatePost, posts } = useContext(PostsContext)
  const classes = postModalStyles()

  const handleAddPost = (post) => {
    window.fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: post.title,
        body: post.body,
        userId: 11
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then((post) => {
        addPost({
          id: posts.length + 1,
          userId: post.userId,
          title: post.title,
          body: post.body
        })
        setCommentPostId(posts.length + 1)
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

  bindSubmitFormPost(formikPostForm.submitForm)

  return (
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
  )
}

export default FormPost
