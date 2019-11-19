import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => 
  createStyles({root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
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
  }}),
);