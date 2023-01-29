import React, { useState, useEffect } from 'react';
import useStyles from './styles'
import axios from 'axios'


export default function TextBox() {
    const classes = useStyles();

    const [info, setInfo] = useState([]);




    useEffect(() => {
        axios.get('http://localhost:5500/announcement').then((allInfo) => {
            setInfo(allInfo.data);
            console.log(allInfo.data);
        })
}, []);


    return(
        <div className={classes.box}>
            
            <div className={classes.title} >Ανακοινώσεις</div>
            {info.map(item => (<div className={classes.description}>{item.announcement}</div>))}
        </div>
    );
}