import { createStyles, makeStyles, Theme, createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#64b5f6',
      light: '#9be7ff',
      dark: '#2286c3',
      contrastText: '#000',
    },
    secondary: {
      light: '#d7ffd9',
      main: '#a5d6a7',
      dark: '#75a478',
      contrastText: '#000',
    },
  },
});

export const useStyles = makeStyles((theme: Theme) => 
  createStyles(
    {
      root:
      {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 1,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
      formControl: {
	      margin: theme.spacing(1),
	      minWidth: 120,
      },
      selectPrimary: {
        color: theme.palette.primary.main,
      },
      selectSecondary: {
        color: theme.palette.secondary.main
      },
      gridItem: {
        //outline: '1px solid red',
      },
      geography: {
        color: theme.palette.primary.main,
        fontWeight: 2
      },
      countDisplayBox:{
        border: 2,
        borderColor: theme.palette.secondary.dark,
        borderRadius: 4
      },
      countDisplayTypography: {
        color: theme.palette.secondary.main,
      },
      dateDisplayDescription: {
        fontStyle: 'italic',
        color: 'secondary',
        margin: '3px'
      },
      dateDisplayDate: {
        fontStyle: 'bold',
        color: theme.palette.primary.dark,
        margin: '3px'
      },
      chipBox: {
        margin: '3px'
      },
      chip: {
        margin: '3px'
      }
})
);