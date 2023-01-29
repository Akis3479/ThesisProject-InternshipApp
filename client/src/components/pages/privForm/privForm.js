import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form, Container } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import 'react-date-range/dist/styles.css';
import '../privForm/Calendar.css'
import 'react-date-range/dist/theme/default.css';
import Calendar from 'react-calendar'
import axios from "axios";



const FormPage = () => {

    const navigate = useNavigate();


    const [date, setDate] = useState();
    const [date2, setDate2] = useState();

    
    //file selection single
    const [transcriptFile, setTranscriptFile] = useState('');
    const [cvFile, setCvFile] = useState('');

    const handleChangeTranscript = (e) => {
        //setSingleFile(e.target.files[0])
        console.log(e.target.files[0]);
        setTranscriptFile(e.target.files[0]);
    };

    const handleChangeCv = (e) => {
        //setSingleFile(e.target.files[0])
        console.log(e.target.files[0]);
        setCvFile(e.target.files[0]);
    };


    const handleDisable = ({date}) => {
        if((date.getDate() !== 1 && date.getDate() !== 16) ){
            return date.getDate()
        }
        
    }

    const [duration, setDuration] = useState([]);

    const [protocol, setProtocol] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5500/intershipDates').then((allInfo) => {
            setDuration(allInfo.data);
            console.log(allInfo.data);
        })
        axios.get('http://localhost:5500/protocol/get').then((allProtocol) =>{
            setProtocol(allProtocol.data)
            console.log(allProtocol.data)
        })
    }, []);

    const dateStart = new Date(duration.map(item => item.start));
    console.log("the start date is: "+dateStart.toLocaleDateString())
    const dateEnd = new Date(duration.map(item => item.end));
    console.log("the end date is: "+dateEnd.toLocaleDateString())

    


    const onSubmitChange = async (e) => {
        e.preventDefault();
        console.log(date);
        var newProtocol = protocol.privProtocol + 1;
        let data = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            telephone: e.target.telephone.value,
            semester: e.target.semester.value,
            atlas1: e.target.atlas1.value,
            atlas2: e.target.atlas2.value,
            company1: e.target.company1.value,
            company2: e.target.company2.value,
            companyTel1: e.target.companyTel1.value,
            companyTel2: e.target.companyTel2.value,
            supervisor: e.target.supervisor.value,
            applicationType: 'private',
            date1 : date,
            date2 : date2,
            protocolNum: newProtocol
            // transcript: e.target.transcript.files[0].name,
            //disabilitiesApp: e.target.disabilitiesApp.files[0].name,
            //cv: e.target.CV.files[0].name

            // transcript: {
            //     file: file,
            //     fileName : e.target.transcript.files[0].name,
            // }
        }

        let updateProt = {
            espaProtocol: protocol.espaProtocol,
            privProtocol: newProtocol
        }
        
        console.log("---Updated-- "+ updateProt.espaProtocol + ":" + updateProt.privProtocol)


        const transcriptFileData = new FormData();
        transcriptFileData.append('user', e.target.email.value);
        transcriptFileData.append('type', 'Αναλυτική βαθμολογία');
        transcriptFileData.append('files', transcriptFile);
        
        const cvFileData = new FormData();
        cvFileData.append('user', e.target.email.value);
        cvFileData.append('type', 'Βιογραφικό');
        cvFileData.append('files', cvFile);

        console.log("data of single file"+ transcriptFile );
        await axios.all([
            axios.post('http://localhost:5500/student/multipleFiles', transcriptFileData),
            axios.post('http://localhost:5500/student/multipleFiles', cvFileData),
            axios.post('http://localhost:5500/student', data),
            axios.post('http://localhost:5500/protocol/update',updateProt)
        ]).then((response) => {alert(`'Η αίτηση σας με αριθμό πρωτοκόλλου: ${newProtocol} καταχωρηθήκε επιτυχώς`)}).then((response)=>{navigate('/', {replace: true})})
        console.log(data);
    }                       

    return (
        <Form onSubmit={onSubmitChange}>
            <Container >
                <h2 className="mt-2">Βασικά στοιχεία</h2>
                <Row className="mx-5 my-4" md={4}>
                    <Form.Group as={Col} className="mb-3 text-start" lg={5} md={5} xs={10}  >
                        <Form.Label style={{ width: "100%" }}>
                            Όνομα*
                        </Form.Label>
                        <Form.Control name="firstName" required type="text" placeholder="" className="mb-3 w-100" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={5} md={5} xs={10}>
                        <Form.Label >
                            Επίθετο*
                        </Form.Label>
                        <Form.Control name="lastName" required type="text" placeholder="" />
                    </Form.Group>
                </Row>
                <Row className="mx-5 mb-3">
                    <Form.Group as={Col} className="mb-3 text-start" lg={5} md={4} xs={10}>
                        <Form.Label >
                            Email*
                        </Form.Label>
                        <Form.Control name="email" required type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Τηλέφωνο*
                        </Form.Label>
                        <Form.Control name="telephone" required type="text" minlength="10" maxlength="10" placeholder="" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={1} md={2} xs={3}>
                        <Form.Label >
                            Εξάμηνο*
                        </Form.Label>
                        <Form.Control name="semester" required type="number" min="1" placeholder="" />
                    </Form.Group>
                </Row>
                <Row className="mx-5 mb-3">
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Υπεύθυνος καθηγητής πρακτικής
                        </Form.Label>
                        <Form.Select aria-label="Supervisor" name="supervisor">
                            <option>Επιλογή</option>
                            <option value="Maria Papadopouli">Maria Papadopouli</option>
                            <option value="Giannis Tzitzikas">Giannis Tzitzikas</option>
                            <option value="Manolis G.H. Katevenis">Manolis G.H. Katevenis</option>
                            <option value="Antonis Argyros">Antonis Argyros</option>
                            <option value="Angelos Bilas">Angelos Bilas</option>
                            <option value="Georgios Georgakopoulos">Georgios Georgakopoulos</option>
                            <option value="Panagiota Fatourou">Panagiota Fatourou</option>
                            <option value="Kostas Magoutis">Kostas Magoutis</option>
                            <option value="Evangelos Markatos">Evangelos Markatos</option>
                            <option value="Dimitris Plexousakis">Dimitris Plexousakis</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Container>
            <Container>
                
                <h2 className="mt-2 mb-1">Στοιχεία θέσης πρακτικής άσκησης</h2>
                    <Form.Group  className="mb-3 text-center" lg={4} md={4} xs={8}>
                            <a href="https://www.csd.uoc.gr/index.jsp?content=work_experience&openmenu=demoAcc3&lang=gr" target="_blank" rel="noopener noreferrer"><Button variant="link">Μετάβαση στην σελίδα</Button></a>
                    </Form.Group>
                <Row className="mx-5">
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={6} >
                        <Form.Label style={{ width: "100%" }}>
                            Κωδικός θέσης *
                        </Form.Label>
                        <Form.Control name="atlas1" required type="text" placeholder="" className="w-100" />
                        <Form.Text muted className="mb-3">
                            Θέση 1
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Όνομα φορέα*
                        </Form.Label>
                        <Form.Control name="company1" required type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Τηλέφωνο φορέα
                        </Form.Label>
                        <Form.Control name="companyTel1" type="text" placeholder="" minlength="10" maxlength="10"/>
                    </Form.Group>
                    
                </Row>
                <Row className="mx-5">
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={6} >
                        <Form.Label style={{ width: "100%" }}>
                            Κωδικός θέσης 2
                        </Form.Label>
                        <Form.Control name="atlas2" type="text" placeholder="" />
                        <Form.Text muted className="mb-3">
                            Θέση 2
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Όνομα φορέα 2
                        </Form.Label>
                        <Form.Control name="company2" type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Τηλέφωνο φορέα 2
                        </Form.Label>
                        <Form.Control name="companyTel2" type="text" placeholder="" minlength="10" maxlength="10"/>
                    </Form.Group>
                    
                </Row>
                
            </Container>
            <Container>
                <h3 className="mt-2 mb-4">Ημερομηνία έναρξης πρακτικής</h3>
                <Row className="mx-5">
                    <Form.Group as={Col} className="mb-3 text-start mx-auto" lg={4} md={8} xs={12}>
                        <Form.Label >
                            Κύρια ημερομηνία*
                        </Form.Label>
                        <Calendar 
                            onChange={setDate} 
                            value={date} 
                            tileDisabled={handleDisable}
                            minDate={dateStart}
                            maxDate={dateEnd}
                           
                            />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start mx-auto" lg={4} md={8} xs={12}>
                        <Form.Label >
                            Εναλλακτική ημερομηνία
                        </Form.Label>
                        <Calendar 
                            onChange={setDate2} 
                            value={date2} 
                            tileDisabled={handleDisable}
                            minDate={dateStart}
                            maxDate={dateEnd}

                        />
                    </Form.Group>
                </Row>
            </Container>
            <Container>
                <h2 className="mt-2">Συνημμένα</h2>
                <Row className="mx-5">
                    <Form.Group as={Col} controlId="formFile" className="mb-3 mt-3 text-start" lg={4} md={6} xs="auto">
                        <Form.Label>Αναλυτική βαθμολογία*</Form.Label>
                        <Form.Control name="transcript" required type="file" accept="image/*,.pdf" onChange={handleChangeTranscript} />
                    </Form.Group>
                </Row>
                <Row className="mx-5">
                    <Form.Group as={Col} controlId="formFile" className="mb-3 mt-3 text-start" lg={4} md={6} xs="auto">
                        <Form.Label>Βιογραφικό σημείωμα</Form.Label>
                        <Form.Control type="file" name="CV" accept="image/*,.pdf" onChange={handleChangeCv}/>
                    </Form.Group>
                </Row>
            </Container>
            <Button variant="primary" type="submit" className="mt-2 mb-5" >Υποβολή δήλωσης</Button>
        </Form >
    );
};

export default FormPage;