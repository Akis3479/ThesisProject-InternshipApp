import React from 'react';
import { Col, Row, Form, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const AddUser = () => {

    const onSubmitChange = (e) => {
        e.preventDefault();
        let data = {
            username: e.target.username.value,
            password: e.target.password.value,
            userType: e.target.role.value
        }

        axios.post('http://localhost:5500/user', data).then((response) => {alert('New User added successfully')})
    }

    return (
        <Form onSubmit={onSubmitChange}>
            <Container >
                <h2 className="mt-4">Νέος χρήστης</h2>
                <Row className="mx-5 my-4 justify-content-center" md={4}>
                    <Form.Group as={Col} className="mb-3 text-start" lg={5} md={5} xs={10}  >
                        <Form.Label style={{ width: "100%" }}>
                            Username
                        </Form.Label>
                        <Form.Control name="username" required type="text" placeholder="" className="mb-3 w-100" />
                    </Form.Group>
                </Row>
                <Row className="mx-5 my-4 justify-content-center" md={4}>
                    <Form.Group as={Col} className="mb-3 text-start" lg={5} md={5} xs={10}>
                        <Form.Label >
                            Password
                        </Form.Label>
                        <Form.Control name="password" required type="password" placeholder="" autoComplete="on" />
                    </Form.Group>
                </Row>
                <Row className="mx-5 mb-3 justify-content-center">
                    <Form.Group as={Col} className="mb-3 text-start" lg={5} md={5} xs={10}>
                        <Form.Label >
                            Role
                        </Form.Label>
                        <Form.Select aria-label="Role" name="role">
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Container>
            <Button variant="primary" type="submit" className="mt-2 mb-5" >Προσθήκη</Button>
        </Form>
    );
}

export default AddUser;