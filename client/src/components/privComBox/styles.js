import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(() => ({

    box: {
        maxHeight: "lg",
        maxWidth: "lg",
        padding: 20,
        margin: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        backgroundColor: '#F5F5F5',
        alignContent: 'space-between',
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
        paddingRight: '15%',
    },

    dates: {
        textAlign: 'left',
        marginBottom: '2vh'
    },

    cont2:{
        marginLeft: 'auto',
        marginRight: '5%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    datesLabel: {
        fontWeight: 600,
        whiteSpace: 'nowrap',
        marginBottom: '2vh'
    }

}))