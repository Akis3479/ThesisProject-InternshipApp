import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
    {
        id: 'applicationType',
        label: 'Προς',
        minWidth: 20,

    },
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
        label: 'Κωδικός θέσης 1',
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
        label: 'Κωδικός θέσης 2',
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

export default function Application({ application }) {
    const formatDate = (value) => {
        if (value) {
    
          const date = new Date(value).toLocaleDateString()
          return date;
        }
      }

    console.log("--------!--------", application);


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
            <h2 className="m-4">Οι αιτήσεις μου</h2>
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
                        {application
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
                                                         : (column.id === "date1" || column.id === "date2") ? formatDate(value)
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
        </Paper>
    )
}