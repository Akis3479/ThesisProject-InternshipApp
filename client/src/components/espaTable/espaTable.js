import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import FileDownload from 'js-file-download';
import { ExportJsonCsv } from 'react-export-json-csv';
import './styles.css';

import { saveAs } from 'file-saver';




const columns = [
  {
    id: 'protocolNum',
    label: 'Α.Π.',
    minWidth: 20,
  },
  { id: 'firstName', label: 'Όνομα', minWidth: 120 },
  { id: 'lastName', label: 'Επίθετο', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 80, },
  {
    id: 'telephone',
    label: 'Τηλέφωνο',
    minWidth: 80,
  },
  {
    id: 'semester',
    label: 'Εξάμηνο',
    minWidth: 20,
  },
  {
    id: 'supervisor',
    label: 'Υπεύθυνος καθηγητής',
    minWidth: 20,
  },
  {
    id: 'atlas1',
    label: 'Κωδικός ΑΤΛΑΣ 1',
    minWidth: 20,
  },
  {
    id: 'company1',
    label: 'Όνομα φορέα',
    minWidth: 20,
  },
  {
    id: 'companyTel1',
    label: 'Τηλέφωνο',
    minWidth: 20,
  },
  {
    id: 'atlas2',
    label: 'Κωδικός ΑΤΛΑΣ 2',
    minWidth: 20,
  },
  {
    id: 'company2',
    label: 'Όνομα φορέα',
    minWidth: 20,
  },
  {
    id: 'companyTel2',
    label: 'Τηλέφωνο',
    minWidth: 20,
  },
  {
    id: 'date1',
    label: 'Βασική',
    minWidth: 20,
  },
  {
    id: 'date2',
    label: 'Εναλλακτική',
    minWidth: 20,
  },


];

const headers = [
  {
    key: 'protocolNum',
    name: 'Α.Π.',
  },
  {
    key: 'firstName',
    name: 'Όνομα',
  },
  {
    key: 'lastName',
    name: 'Επίθετο',
  },
  {
    key: 'email',
    name: 'Email',
  },
  {
    key: 'telephone',
    name: 'Τηλέφωνο',

  },
  {
    key: 'semester',
    name: 'Εξάμηνο',

  },
  {
    key: 'supervisor',
    name: 'Υπεύθυνος καθηγητής',

  },
  {
    key: 'atlas1',
    name: 'Κωδικός ΑΤΛΑΣ 1',

  },
  {
    key: 'company1',
    name: 'Όνομα φορέα',

  },
  {
    key: 'companyTel1',
    name: 'Τηλέφωνο',

  },
  {
    key: 'atlas2',
    name: 'Κωδικός ΑΤΛΑΣ 2',

  },
  {
    key: 'company2',
    name: 'Όνομα φορέα 2',

  },
  {
    key: 'companyTel2',
    name: 'Τηλέφωνο 2',

  },
  {
    key: 'date1',
    name: 'Βασική',

  },
  {
    key: 'date2',
    name: 'Εναλλακτική',

  },

];


export default function EspaTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [studentsList, setStudentsList] = useState([]);
  const [studentsListLength, setStudentsLengthList] = useState([]);

  const [filesList, setFilesList] = useState([]);

  const [exportData, setExportData] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5500/student').then((allStudents) => {
      setStudentsList(allStudents.data);
      setStudentsLengthList(allStudents.data);
      var tmp = allStudents.data.filter(st => st['applicationType'] === 'espa')
      tmp = tmp.map(st => {
        let obj = st;

        obj['date1'] = formatDate(obj['date1']);
        obj['date2'] = formatDate(obj['date2']);

        return obj;
      })
      setExportData(tmp);

    })
  }, [setStudentsList, setStudentsLengthList, setExportData]);

  useEffect(() => {

    axios.get('http://localhost:5500/student/getMultipleFiles').then((allFiles) => {
      setFilesList(allFiles.data);
    })

  }, [setFilesList])


  const formatDate = (value) => {
    if (value) {

      const date = new Date(value).toLocaleDateString()
      return date;
    }
  }

  const filterFiles = (value) => {
    if (value.files.length !== 0) {
      return value.files;
    }
  }

  const downloadFile = (e, name) => {
    console.log(e);
    let data = {
      path: e.toString(),
    }

    axios({
      url: 'http://localhost:5500/download/', //your url
      method: 'POST',
      responseType: 'blob', // important
      data: data
    }).then((res) => {
      FileDownload(res.data, e.toString())
    })


  }
  
  const downloadZip = () => {
    let tmp=[];
    filesList.filter(files=>files.files.length > 0).map((file, key) => (
      
        file.files.map((list) => (
        tmp.push({ name: list.fileName, path: "./"+list.filePath.toString()  })
        
      ))
    ))

    console.log(tmp)

    // let data = {
    //   path: e.toString(),
    //   name: name
    // }

    //console.log("------", data)

    axios({
      url: 'http://localhost:5500/download/zip', //your url
      method: 'POST',
      responseType: 'arraybuffer', // important
      data: tmp
    }).then(function (response) {
      console.log(response);
      const url = new Blob([response.data], { type: "octet/stream" });
      
      saveAs(url, 'attachment.zip');
    })
      .catch(function (error) {
        console.log(error);
      });



  }




  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#44B8FA', color: '#FFFFFF', fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList
              .filter(st => st['applicationType'] === 'espa')
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student, key) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                    {columns.map((column) => {
                      const value = student[column.id];
                      //console.log(student[column.id]);
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            // : (column.id === "date1" || column.id === "date2") ? formatDate(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={studentsListLength
          .filter(st => st['applicationType'] === 'espa').length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ExportJsonCsv headers={headers} items={exportData} className="button-10">Εξαγωγή Πίνακα</ExportJsonCsv>

      <h3 className="mt-4 mb-4">Αρχεία</h3>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ backgroundColor: '#1D8BC9', color: '#FFFFFF', fontWeight: 500, width: '33%' }}>Χρήστης</TableCell>
            <TableCell align="center" style={{ backgroundColor: '#24B0FF', color: '#FFFFFF', fontWeight: 500, width: '33%' }}>Τύπος</TableCell>
            <TableCell align="center" style={{ backgroundColor: '#1D8BC9', color: '#FFFFFF', fontWeight: 500, width: '33%' }}>Αρχείο</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {filesList.map((file, key) => (
            file.files.length !== 0 &&
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                {file.user}
              </TableCell>
              <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>
                {file.type}
              </TableCell>
              <TableCell align="center" >{filterFiles(file).map((list) => (

                <li>
                  <Button variant="link" onClick={(e) => downloadFile(list.filePath, list.fileName)}  >{list.fileName}</Button>
                </li>))}
              </TableCell>
            </TableRow>


          ))}
        </TableBody>
      </Table>
      <Button onClick={(e) => downloadZip()}  >Download all</Button>
    </Paper>

  );
}
