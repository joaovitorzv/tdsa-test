import { useState } from 'react'
import {
  Dialog,
  DialogTitle
} from '@material-ui/core'

import FormPost from './formPost'
import FormComment from './formComment'

function PostModal ({ open, setOpen, modalTitle, formData, modalAction }) {
  const [showCommentsForm, setShowCommentsForm] = useState(false)
  const [allowComment, setAllowComment] = useState(true)

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
      />
      <FormComment
        formData={formData}
        handleClose={handleClose}
        setAllowComment={setAllowComment}
        setShowCommentsForm={setShowCommentsForm}
        modalAction={modalAction}
        allowComment={allowComment}
        showCommentsForm={showCommentsForm}
      />
    </Dialog>
  )
}

export default PostModal
