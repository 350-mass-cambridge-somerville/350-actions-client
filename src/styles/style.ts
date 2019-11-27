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
        backgroundColor: theme.palette.primary.dark,
        margin: 0,
        minHeight: '100vh'
      },
      formControl: {
	      margin: theme.spacing(1),
	      minWidth: 120,
      },
      selectPrimary: {
        color: 'primary',
      },
      selectSecondary: {
        color: 'secondary'
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
      },
      contentMain: {
        width: 'auto',
        backgroundColor: 'primary',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      contentTitle: {
        color: 'primary'
      },
      appBar: {
        color: 'primary'
      },
      actionExpansionPanels: {

      }
}), {defaultTheme: theme}
);