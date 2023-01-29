import Announcements from '../../announcements/announcements.js';
import EspaBox from '../../espaBox/espaBox.js';
import PrivComBox from '../../privComBox/privComBox.js';
import EspaTable from '../../espaTable/espaTable.js';
import PrivTable from '../../privTable/privTable.js';
import AddUser from '../../addUser/addUser.js';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useStyles from './styles'
import axios from 'axios'
//import styles from './styles.js';
import './styles2.css'


export default function Home() {
    const classes = useStyles();
    const navigate = useNavigate();

    const [dates, setDates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/intershipDates').then((allInfo) => {
            setDates(allInfo.data);
            console.log(allInfo.data);
        })
    }, []);

    const dateStart = new Date(dates.map((item,key) => item.start));
    console.log("the start date is: "+dateStart.toLocaleDateString())
    const dateEnd = new Date(dates.map((item,key) => item.end));
    console.log("the end date is: "+dateEnd.toLocaleDateString())

    const flag = 'admin';


    return (
        <div className="home">
            <div className={classes.tab}>
            <h2 className="mt-4">Admin Page</h2>
            <Tabs defaultActiveKey="announcements" id="uncontrolled-tab-example" className="mb-3 mt-5">
                <Tab key="announcments" eventKey="announcements" title="Ανακοινώσεις">
                    <Button onClick={() => navigate("/updateInfo")} variant="contained" className=" mt-3" style={{ backgroundColor: "#63BAFF", borderRadius: 16, textTransform: 'capitalize', padding: "10px 28px", fontSize: 16 }}>
                        Επεξεργασία
                        <EditIcon style={{ marginLeft: 20 }}></EditIcon>
                    </Button>
                    <Announcements />
                    <EspaBox flag = {flag}/>
                    <PrivComBox flag = {flag}/>
                    <h3 className="mt-4">Ημερομηνίες εκπόνησης πρακτικής</h3>
                    <div className={classes.box}>
                        <div className={classes.cont1}>
                            <div className={classes.dates} >
                                <div className={classes.dates} >
                                    {dates.map((item,key) =>
                                    (<div className={classes.dates}>Έναρξη:{new Date(item.start).toLocaleDateString()}
                                        <br></br>
                                        Λήξη:{new Date(item.end).toLocaleDateString()}</div>))}
                                </div>
                            </div>
                        </div>
                        <div className={classes.cont2}>
                            <Button onClick={() => navigate("/updateDates")} variant="contained" style={{ backgroundColor: "#63BAFF", borderRadius: 16, textTransform: 'capitalize', }} className={classes.btn}>
                                Ενημέρωση
                            </Button>
                        </div>
                    </div>
                </Tab>
                <Tab key="espa" eventKey="espa" title="Αιτήσεις ΕΣΠΑ">
                    <EspaTable />
                </Tab>
                <Tab key="priv" eventKey="priv" title="Αιτήσεις Ιδιώτη">
                    <PrivTable />
                </Tab>
                <Tab key="newUser" eventKey="newUser" title="Προσθήκη χρήστη">
                    <AddUser />
                </Tab>
            </Tabs>
            </div>
        </div>
    );
}