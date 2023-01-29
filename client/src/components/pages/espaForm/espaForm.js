import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form, Container, Tooltip, OverlayTrigger } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import 'react-date-range/dist/styles.css';
import '../espaForm/Calendar.css'
import 'react-date-range/dist/theme/default.css';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Calendar from 'react-calendar'
import axios from "axios";



const FormPage = () => {

    const navigate = useNavigate();

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          · Κατεβάστε την αίτηση
          <br></br>
          · Συμπληρώστε τα στοιχεία σας και αποθηκεύστε το ως pdf
          <br></br>
          · Ανεβάστε την αίτηση στο gov.gr για ψηφιακή βεβαίωση
          <br></br>
          · Ανεβάστε την υπογεγραμμένη αίτηση στη φόρμα της αίτησης 
        </Tooltip>
      );

    const [date, setDate] = useState();
    const [date2, setDate2] = useState();

    
    //file selection single
    const [transcriptFile, setTranscriptFile] = useState('');
    const [disabilitiesFile, setDisabilitiesFile] = useState('');
    const [cvFile, setCvFile] = useState('');

    //file selection multiple
    const [SoFiFiles, setSofiFiles] = useState('');

    const handleChangeTranscript = (e) => {
        //setSingleFile(e.target.files[0])
        console.log(e.target.files[0]);
        setTranscriptFile(e.target.files[0]);
    };

    const handleChangeDis = (e) => {
        //setSingleFile(e.target.files[0])
        console.log(e.target.files[0]);
        setDisabilitiesFile(e.target.files[0]);
    };

    const handleChangeCv = (e) => {
        //setSingleFile(e.target.files[0])
        console.log(e.target.files[0]);
        setCvFile(e.target.files[0]);
    };

    const handleChangeSofi = (e) => {
        //setSingleFile(e.target.files[0])
        console.log(e.target.files);
        setSofiFiles(e.target.files);
    };

    const handleDisable = ({date}) => {
        if((date.getDate() !== 1 && date.getDate() !== 16) ){
            return date.getDate()
        }
        
    }

    const handleChangeAtlas1 = (e) => {
        setAtlasNum(e.target.value)

    }

    const handleChangeAtlas2 = (e) => {
        console.log(e.target.value);
        console.log("θεση 1 "+ atlasNum);
        if (e.target.value === atlasNum){
            alert("Ο αριθμός της Θέσης ΑΤΛΑΣ 2 πρέπει να είναι διαφορετικός απο την Θέση ΑΤΛΑΣ 1")
        }

    }

    // const valEmail = (value) => {
    //     if (!isEmail(value)) {
    //         return (
    //           <div className="alert alert-danger" role="alert">
    //             This is not a valid email.
    //           </div>
    //     );
    // }}

    const [duration, setDuration] = useState([]);

    const [protocol, setProtocol] = useState([]);

    const [atlasNum, setAtlasNum] = useState([]);

    
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
        var newProtocol = protocol.espaProtocol + 1;
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
            applicationType: 'espa',
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
        // if (e.target.disabilitiesApp.files[0]) {
        //     data = {
        //     disabilitiesApp: e.target.disabilitiesApp.files[0].name
        //     }
        // }
        // if (e.target.CV.files[0]) {
        //     data = {
        //     cv: e.target.CV.files[0].name
        //     }
        // }


        let updateProt = {
            espaProtocol: newProtocol,
            privProtocol: protocol.privProtocol
        }
        
        console.log("---Updated-- "+ updateProt.espaProtocol + ":" + updateProt.privProtocol)

        


        const transcriptFileData = new FormData();
        transcriptFileData.append('files', transcriptFile);
        transcriptFileData.append('type', 'Αναλυτική βαθμολογία');
        transcriptFileData.append('user', e.target.email.value);
        
        
        const disabilitiesFileData = new FormData();
        disabilitiesFileData.append('user', e.target.email.value);
        disabilitiesFileData.append('type', 'Δήλωση ΑΜΕΑ');
        disabilitiesFileData.append('files', disabilitiesFile);


        const cvFileData = new FormData();
        cvFileData.append('user', e.target.email.value);
        cvFileData.append('type', 'Βιογραφικό');
        cvFileData.append('files', cvFile);

        const SoFiFilesData = new FormData();
        SoFiFilesData.append('user', e.target.email.value);
        SoFiFilesData.append('type', 'Κοινωνικοοικονομικά κριτ.');
        for(let i = 0 ; i < SoFiFiles.length ; i++){
            SoFiFilesData.append('files', SoFiFiles[i]);
        }

        console.log("data of single file"+ transcriptFile );
        await axios.all([
            axios.post('http://localhost:5500/student/multipleFiles', transcriptFileData),
            axios.post('http://localhost:5500/student/multipleFiles', disabilitiesFileData),
            axios.post('http://localhost:5500/student/multipleFiles', cvFileData),
            axios.post('http://localhost:5500/student/multipleFiles', SoFiFilesData),
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
                        <Form.Control name="firstName" required type="text" placeholder="" className=" w-100 shadow  mb-2 bg-white rounded" />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={5} md={5} xs={10}>
                        <Form.Label >
                            Επίθετο*
                        </Form.Label>
                        <Form.Control name="lastName" required type="text" placeholder="" className="shadow  mb-2 bg-white rounded" />
                    </Form.Group>
                </Row>
                <Row className="mx-5 mb-3">
                    <Form.Group as={Col} className="mb-3 text-start" lg={5} md={4} xs={10}>
                        <Form.Label >
                            Email*
                        </Form.Label>
                        <Form.Control name="email" required type="text" placeholder="" className="shadow  mb-2 bg-white rounded"/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Τηλέφωνο*
                        </Form.Label>
                        <Form.Control name="telephone" required type="text" placeholder="" minlength="10" maxlength="10" className="shadow  mb-2 bg-white rounded"/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={2} md={2} xs={3}>
                        <Form.Label >
                            Εξάμηνο*
                        </Form.Label>
                        <Form.Control name="semester" required type="number" min="1" placeholder="" className="shadow  mb-2 bg-white rounded"/>
                    </Form.Group>
                </Row>
                <Row className="mx-5 mb-3">
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Υπεύθυνος καθηγητής πρακτικής
                        </Form.Label>
                        <Form.Select aria-label="Supervisor" name="supervisor" className="shadow  mb-2 bg-white rounded">
                            <option value="">Επιλογή</option>
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
                
                <h2 className="mt-2 mb-1">Στοιχεία ΑΤΛΑΣ</h2>
                    <Form.Group  className="mb-3 text-center" lg={4} md={4} xs={8}>
                            <a href="https://submit-atlas.grnet.gr/" target="_blank" rel="noopener noreferrer"><Button variant="link">Μετάβαση στην σελίδα</Button></a>
                    </Form.Group>
                <Row className="mx-5">
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={6} >
                        <Form.Label style={{ width: "100%" }}>
                            Κωδικός ΑΤΛΑΣ *
                        </Form.Label>
                        <Form.Control onChange={handleChangeAtlas1} minLength="6" maxLength="7" name="atlas1" required type="text" placeholder="" className="w-100 shadow  mb-2 bg-white rounded" />
                        <Form.Text muted className="mb-3">
                            Θέση 1
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Όνομα φορέα*
                        </Form.Label>
                        <Form.Control name="company1" required type="text" placeholder="" className="shadow  mb-2 bg-white rounded"/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Τηλέφωνο φορέα
                        </Form.Label>
                        <Form.Control name="companyTel1" type="text" placeholder="" minLength="10" maxLength="10" className="shadow  mb-2 bg-white rounded"/>
                    </Form.Group>
                    
                </Row>
                <Row className="mx-5">
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={6} onChange={handleChangeAtlas2}>
                        <Form.Label style={{ width: "100%" }}>
                            Κωδικός ΑΤΛΑΣ 2
                        </Form.Label>
                        <Form.Control   name="atlas2" type="text" minLength="6" maxLength="7" placeholder="" className="shadow  mb-2 bg-white rounded"/>
                        <Form.Text muted className="mb-3">
                            Θέση 2
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Όνομα φορέα 2
                        </Form.Label>
                        <Form.Control name="company2" type="text" placeholder="" className="shadow  mb-2 bg-white rounded"/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 text-start" lg={4} md={4} xs={10}>
                        <Form.Label >
                            Τηλέφωνο φορέα 2
                        </Form.Label>
                        <Form.Control name="companyTel2" type="text" placeholder="" minLength="10" maxLength="10" className="shadow  mb-2 bg-white rounded"/>
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
                        <Calendar onChange={setDate2} value={date2} 
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
                        <Form.Label>Υπεύθυνη δήλωση ΑΜΕΑ</Form.Label>
                        
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                        className="mb"
                        lg={4} md={4} >
                        <Button lg={2} md={2} variant="link"><InfoOutlinedIcon></InfoOutlinedIcon>  Οδηγίες</Button>
                    </OverlayTrigger>

                        <Form.Control type="file" name="disabilitiesApp" accept="image/*,.pdf" onChange={handleChangeDis}/>
                    </Form.Group>
                    
                    <Form.Group as={Col} className="mb-3 mt-4 " lg={4} md={4} xs="auto">
                        <a href="/media/Yp_Dilosi_AMEA.doc " download target="_blank" rel="noopener noreferrer" >
                            <Button variant="link">Λήψη uπεύθυνης δήλωσης</Button>
                        </a>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 mt-4 text-start" lg={4} md={4} xs="auto">
                        <a href="https://www.gov.gr/ipiresies/polites-kai-kathemerinoteta/psephiaka-eggrapha-gov-gr/psephiake-bebaiose-eggraphou" target="_blank" rel="noopener noreferrer">
                            <Button variant="link">Ψηφιακή Βεβαίωση Εγγράφου Gov.gr</Button>
                        </a>
                    </Form.Group>
                    
                   
                </Row>
                <Row className="mx-5">
                    <Form.Group as={Col} controlId="formFile" className="mb-3 mt-3 text-start" lg={4} md={6} xs="auto">
                        <Form.Label>Έγγραφα για κοινωνικά και οικονομικά κριτήρια</Form.Label>
                        <Form.Control type="file" multiple accept=".pdf" label="File" name="SoFi" onChange={handleChangeSofi} />
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