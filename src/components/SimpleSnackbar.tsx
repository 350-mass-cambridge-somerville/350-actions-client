import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { useStyles } from '../styles/style';

export interface SnackbarState  {
  open: boolean;
}

export type SnackbarProps = {
	message: string,
	isError: boolean,
	open: boolean,
	handleClose: (event: any) => void
}

export default function SimpleSnackbar(props: SnackbarProps) {
  const classes = useStyles();

  return (
    <div>
      <Snackbar
        anchorOrigin={ {vertical: 'top', horizontal: 'center'} }
        open={props.open}
        onClose={props.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
		}}
      >
		<SnackbarContent
		  className={props.isError ? classes.snackbarError : classes.snackbarSuccess}
		  action={[
			<IconButton
			  key="close"
			  aria-label="close"
			  color="inherit"
			  onClick={props.handleClose}
			>
			  <CloseIcon />
			</IconButton>,
		  ]}
        message={<span id="message-id">{props.message}</span>}/>
	</Snackbar>
    </div>
  );
}
