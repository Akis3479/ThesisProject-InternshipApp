import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(() => ({

    box: {
        maxHeight: "lg",
        maxWidth: "lg",
        padding: 20,
        margin: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        backgroundColor: '#F5F5F5',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',

    },

    title: {
        fontStyle: 'normal',
        fontWeight: 300,
        fontSize: '24px',
        lineHeight: '39px',
        display: 'flex',

    },

    description: {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '20px',
        textAlign: 'left',
        display: 'flex',
    }
}))