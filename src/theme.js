import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2176FF',
      contrastText: '#e0e0e0'
    },
    secondary: {
      main: '#31393C'
    },
    error: {
      main: '#F79824'
    },
    background: {
      default: '#F5EFED',
      paper: '#FFFF'
    }
  }
})

export default theme
