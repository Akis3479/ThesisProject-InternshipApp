import React, { useState, useEffect } from 'react';
import useStyles from './styles'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function TextBox1({ flag }) {
    const navigate = useNavigate();
    const classes = useStyles();


    const [info, setInfo] = useState([]);

    const [openDate, setOpenDate] = useState([]);
    const [closeDate, setCloseDate] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/announcement').then((allInfo) => {
            setInfo(allInfo.data);
            console.log(allInfo.data);
            setOpenDate(allInfo.data.map(info => info.espaOpen))
            setCloseDate(allInfo.data.map(info => info.espaDeadline))
        })
    }, []);



    return (
        <div className={classes.box}>
            <div className={classes.cont1}>
                <div className={classes.title} >
                    Ανακοίνωση ΕΣΠΑ
                </div>
                {info.map(item => (<div className={classes.description}>{item.espaInfo}</div>))}
            </div>
            <div className={classes.cont2}>
                <div className={classes.datesLabel}>
                    Διάστημα αιτήσεων:
                </div>
                <div className={classes.dates} >
                    {info.map(item =>
                    (<div className={classes.dates} >Έναρξη: {new Date(item.espaOpen).toLocaleDateString()}
                        <br></br>
                        Λήξη: {new Date(item.espaDeadline).toLocaleDateString()}</div>))}
                </div>
                {flag === 'admin'
                    ? <a href="https://www.csd.uoc.gr/index.jsp?content=work_experience&openmenu=demoAcc3&lang=gr" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <Button variant="contained" style={{ backgroundColor: "#63BAFF", borderRadius: 16, textTransform: 'capitalize', }} className={classes.btn}>
                            Μετάβαση στην σελίδα
                        </Button>
                    </a>
                    :<Button disabled={new Date() < new Date(openDate) || new Date() > new Date(closeDate)} onClick={() => navigate("/espaForm")} variant="contained" style={{ backgroundColor: "#63BAFF", borderRadius: 16, textTransform: 'capitalize', }} className={classes.btn}>
                        Αίτηση
                    </Button>
                }
            </div>
        </div>
    );
};
