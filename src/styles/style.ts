import {
	createStyles,
	makeStyles,
	Theme,
	createMuiTheme,
} from '@material-ui/core/styles'

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
})

export const useStyles = makeStyles(
	(theme: Theme) =>
		createStyles({
			root: {
				backgroundColor: theme.palette.primary.dark,
				margin: 0,
				minHeight: '100vh',
			},
			formControl: {
				margin: theme.spacing(1),
				minWidth: 120,
			},
			selectPrimary: {
				color: 'primary',
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
			},
			selectSecondary: {
				color: 'secondary',
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
			},
			gridItem: {
				//outline: '1px solid red',
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
			},
			geography: {
				paddingLeft: '5px',
				paddingRight: '5px',
				color: theme.palette.primary.dark,
				fontWeight: '700!important' as any,
			},
			countDisplayBox: {
				border: 2,
				borderColor: theme.palette.secondary.dark,
				borderRadius: 4,
			},
			countDisplayTypography: {
				color: theme.palette.secondary.main,
			},
			dateDisplayDescription: {
				fontStyle: 'italic',
				color: 'secondary',
				margin: '3px',
			},
			dateDisplayDate: {
				fontStyle: 'bold',
				color: theme.palette.primary.dark,
				margin: '3px',
			},
			chipBox: {
				margin: '3px',
			},
			chip: {
				margin: '3px',
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
				color: 'primary',
				textAlign: 'center',
			},
			contentTitleItalic: {
				color: theme.palette.secondary.dark,
				fontStyle: 'italic',
				textAlign: 'center',
				fontSize: '1.5rem!important' as any,
				fontWeight: 200,
			},
			contentMainTitle: {
				color: theme.palette.primary.dark,
				textAlign: 'center',
				display: 'block',
				fontSize: '4rem!important' as any,
			},
			contentTitleDate: {
				color: theme.palette.secondary.dark,
				textAlign: 'center',
			},
			appBar: {
				color: 'primary',
				justifyContent: 'center',
			},
			actionExpansionPanels: {},
			snackbarSuccess: {
				backgroundColor: theme.palette.secondary.light,
				color: 'black',
			},
			snackbarError: {
				backgroundColor: 'red',
			},
			registrationTitle: {
				color: theme.palette.primary.dark,
				textAlign: 'center',
				display: 'block',
				fontSize: '2rem',
				margin: '2px',
			},
			registrationItem: {
				margin: theme.spacing(1),
				minWidth: 120,
			},
			modal: {
				//display: 'none', /* Hidden by default */
				position: 'fixed' /* Stay in place */,
				zIndex: 1 /* Sit on top */,
				left: 0,
				top: 0,
				width: '100%' /* Full width */,
				height: '100%' /* Full height */,
				overflow: 'auto' /* Enable scroll if needed */,
			},
			modalContent: {
				margin: '15% auto' /* 15% from the top and centered */,
				padding: '20px',
				width: '80%' /* Could be more or less, depending on screen size */,
			},
		}),
	{ defaultTheme: theme },
)
