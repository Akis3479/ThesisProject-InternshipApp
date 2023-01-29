import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({

    

    box: {
        maxHeight: "lg",
        maxWidth: "100%",
        padding: 20,
        margin: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space',
        alignItems: 'center',
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
        marginLeft: '10vh'
    },

    cont2:{
        marginLeft: 'auto',
        marginRight: '25%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    tab: {
        backgroundImage: 'linear-gradient( white,#C0C0C0)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        overflow: 'auto'
    }

}))