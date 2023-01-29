import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import useStyles from './styles'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditInfo() {
    const classes = useStyles();

    const navigate = useNavigate();

    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/announcement').then((allInfo) => {
            setInfo(allInfo.data);
            console.log(allInfo.data);
        })
    }, []);

    const id = info.map(item => (item._id));

    console.log("this is the id" + id);


    const onSubmitChange = (e) => {
        e.preventDefault();
        let data = {
            announcement: e.target.announcement.value,
            espaInfo: e.target.espaInfo.value,
            espaOpen: e.target.espaOpen.value,
            espaDeadline: e.target.espaDeadline.value,
            privInfo: e.target.privInfo.value,
            privOpen: e.target.privOpen.value,
            privDeadline: e.target.privDeadline.value,
        }

        axios.put('http://localhost:5500/announcement/'+id, data).then(response => {
            navigate('/adminHome', {replace: true})}
        )

        

        console.log(data);




    }


    return (
        <Form onSubmit={onSubmitChange}>
            <div className="editInfo">
                <h2 className="mt-4">Επεξεργασία Ανακοινώσεων</h2>

                <div className={classes.box}>
                    <div className={classes.cont1}>
                        <div className={classes.title} >
                            Ανακοινώσεις
                        </div>
                        <Form.Group className="mb-3 text-start " lg={13} md={12} xs={10} >
                            <textarea
                                name="announcement"
                                required type="text"
                                placeholder=""
                                className={classes.textField}
                                defaultValue={info.map(item => (item.announcement))}
                            />
                        </Form.Group>
                    </div>
                    
                </div>

                <div className={classes.box}>
                    <div className={classes.cont1}>
                        <div className={classes.title} >
                            Ανακοίνωση ΕΣΠΑ
                        </div>
                        <Form.Group className="mb-3 text-start " lg={13} md={12} xs={10} >
                            <textarea
                                name="espaInfo"
                                required type="text"
                                placeholder=""
                                className={classes.textField}
                                defaultValue={info.map(item => (item.espaInfo))}
                            />
                        </Form.Group>
                    </div>
                    <div className={classes.cont2}>
                        <div className={classes.dates} >
                        <Form.Group className="mb-3 mx-4 mt-3 text-start " lg={5} md={5} xs={10} >
                            <Form.Label >
                                Έναρξη: <span style={{color:'#b8b8b8'}}>{info.map(item => (new Date(item.espaOpen).toLocaleDateString()))}</span>
                            </Form.Label>
                            <Form.Control 
                                name="espaOpen" 
                                required type="date"  
                                className="mb-3 "
                               />
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4 mt-3 text-start " lg={5} md={5} xs={10} >
                            <Form.Label >
                                Λήξη: <span style={{color:'#b8b8b8'}}>{info.map(item => (new Date(item.espaDeadline).toLocaleDateString()))}</span>
                            </Form.Label>
                            <Form.Control 
                                name="espaDeadline" 
                                required type="date"  
                                className="mb-3 "/>
                        </Form.Group>
                        </div>
                    </div>
                </div>

                <div className={classes.box}>
                    <div className={classes.cont1}>
                        <div className={classes.title} >
                            Ανακοίνωση Ιδιωτικοί φορείς
                        </div>
                        <Form.Group className="mb-3 text-start " lg={13} md={12} xs={10} >
                            <textarea
                                name="privInfo"
                                required type="text"
                                placeholder=""
                                className={classes.textField}
                                defaultValue={info.map(item => (item.privInfo))}
                            />
                        </Form.Group>
                    </div>
                    <div className={classes.cont2}>
                        <div className={classes.dates} >
                        <Form.Group className="mb-3 mx-4 mt-3 text-start " lg={5} md={5} xs={10} >
                            <Form.Label >
                                Έναρξη: <span style={{color:'#b8b8b8'}}>{info.map(item => (new Date(item.privOpen).toLocaleDateString()))}</span>
                            </Form.Label>
                            <Form.Control 
                                name="privOpen" 
                                required type="date"  
                                className="mb-3 "/>
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4 mt-3 text-start " lg={5} md={5} xs={10} >
                            <Form.Label >
                                Λήξη: <span style={{color:'#b8b8b8'}}>{info.map(item => (new Date(item.privDeadline).toLocaleDateString()))}</span>
                            </Form.Label>
                            <Form.Control 
                                name="privDeadline" 
                                required type="date"  
                                className="mb-3 "/>
                        </Form.Group>
                        </div>
                    </div>
                </div>

            </div>
            <Button variant="primary" type="submit" size="lg" className="mt-2 mb-5 " >Ενημέρωση</Button>
        </Form>
    );
}