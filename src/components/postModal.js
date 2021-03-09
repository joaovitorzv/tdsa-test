import { useState } from 'react'
import {
  Dialog,
  DialogTitle
} from '@material-ui/core'

import FormPost from './formPost'
import FormComment from './formComment'

function PostModal ({ open, setOpen, modalTitle, formData, modalAction }) {
  const [showCommentsForm, setShowCommentsForm] = useState(false)
  const [commentPostId, setCommentPostId] = useState()

  let submitFormPost = null

  const bindSubmitFormPost = (submitForm) => {
    submitFormPost = submitForm
  }

  const handleSubmitFormPost = () => {
    if (submitFormPost) {
      setTimeout(() => {
        submitFormPost()
        return commentPostId
      }, 3000)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setShowCommentsForm(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{modalTitle}</DialogTitle>
      <FormPost
        handleClose={handleClose}
        formData={formData}
        modalAction={modalAction}
        bindSubmitFormPost={bindSubmitFormPost}
        setCommentPostId={setCommentPostId}
      />
      <FormComment
        formData={formData}
        handleClose={handleClose}
        setShowCommentsForm={setShowCommentsForm}
        handleSubmitFormPost={handleSubmitFormPost}
        modalAction={modalAction}
        commentPostId={commentPostId}
        showCommentsForm={showCommentsForm}
      />
    </Dialog>
  )
}

export default PostModal
