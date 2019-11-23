import { createStyles, makeStyles, Theme, createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
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
        color: 'red',
      },
      selectSecondary: {
        color: 'blue'
      },
      gridItem: {
        //outline: '1px solid red',
      },
      geography: {
        color: 'primary-dark',
        fontVariant: 'small-caps',
        fontWeight: 2
      },
      countDisplayBox:{
        border: 1,
        borderColor: 'secondary',
        borderRadius: 4
      },
      countDisplayTypography: {
        color: 'seconday'
      },
      dateDisplayDescription: {
        fontStyle: 'italic',
        color: 'secondary'
      },
      dateDisplayDate: {
        fontStyle: 'bold',
        color: 'primary'
      }
})
);