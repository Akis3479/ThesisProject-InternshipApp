import React , { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStyles from './styles'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-date-range/dist/styles.css';
import '../updateDates/Calendar.css'
import 'react-date-range/dist/theme/default.css';
import Calendar from 'react-calendar'
import { Col, Row, Form, Container } from "react-bootstrap";

export default function UpdateDates() {
    const classes = useStyles();
    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());

    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/intershipDates').then((allInfo) => {
            setInfo(allInfo.data);
            console.log(allInfo.data);
        })
    }, []);

    const id = info.map(item => (item._id));

    console.log(id)



    const onSubmitChange = (e) => {
        e.preventDefault();
        if (date >= date2) {
            alert('Η ημερομηνία έναρξης πρέπει να είναι νωρίτερα από την ημερομηνία λήξης περιόδου.').then(navigate('/updateDates', {replace: true}))
            
        }
        let data = {
            start: date,
            end: date2
        }

        console.log(data);

        axios.put('http://localhost:5500/intershipDates/'+id, data).then(response => {
            navigate('/adminHome', {replace: true})}
        )
    }

    return (
        <Form onSubmit={onSubmitChange}>
            <Container className="justify-content-center">
                <h3 className="mt-2 mb-4">Ημερομηνίες διαστήματος πρακτικής</h3>
                <Row className="mx-5 justify-content-center">
                    <Form.Group as={Col} className="mb-3 text-start " lg={6} md={8} xs={12}>
                        <Form.Label className={classes.calendarTitle}>
                            Έναρξη:
                        </Form.Label>
                        <Calendar 
                            onChange={setDate} 
                            value={date} 
                            />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={6} md={8} xs={12}>
                        <Form.Label className={classes.calendarTitle}>
                            Λήξη: 
                        </Form.Label>
                        <Calendar onChange={setDate2} value={date2} 
                            
                        />
                    </Form.Group>
                </Row>
            </Container>
            <Button variant="primary" type="submit" className="mt-2 mb-5" >Ενημέρωση</Button>
        </Form>
    )
}