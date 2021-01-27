import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

import PostsProvider from './hooks/posts'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <PostsProvider>
        <CssBaseline />
        <App />
      </PostsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
