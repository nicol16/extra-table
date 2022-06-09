import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "@material-ui/core";
import DialogComponent from './DialogComponent';

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },

    {
        id: 'genre',
        label: 'Genre',
        minWidth: 170,
        align: 'justify',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'developer',
        label: 'Developer',
        minWidth: 170,
        align: 'justify',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'gameModes',
        label: 'Game Modes',
        minWidth: 170,
        align: 'justify',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'options',
        label: 'Options',
        minWidth: 170,
        align: 'justify',
        format: (value) => value.toLocaleString('en-US'),
    },
];


export default function TableComponent() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [datos, setDatos] = useState([]);
    const [datosActual, setDatosActual] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    function obtenerDatos() {
       axios.get(`http://10.0.0.128:88/api/v1/video-games`).then(response => {
            setDatos(response.data);

        });
    }


        const handleClickOpen = () => {

            setIsOpen(true);
        }


    useEffect(() => {

        obtenerDatos();


    }, []);


    function deleteJuego(videogameID) {

        axios.delete(`http://10.0.0.128:88/api/v1/video-games/${videogameID}`).then(response => {

            setDatos(response.data);
        });
    }

        function obtenerJuegoactual(videogameID) {

            axios.get(`http://10.0.0.128:88/api/v1/video-games/${videogameID}`).then(response => {

                setDatosActual(response.data);

            });
            handleClickOpen();
        }

    return (

        <>

            <DialogComponent handleClickOpen={handleClickOpen} datosActual={datosActual}
                             setDatos={setDatos} isOpen={isOpen} setIsOpen={setIsOpen}/>

            <br/>
            <br/>
            <br/>


        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((dato) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={dato.id}>
                                        <TableCell>{dato.name}</TableCell>
                                        <TableCell>{dato.genre}</TableCell>
                                        <TableCell>{dato.developer}</TableCell>
                                        <TableCell>{dato.gameModes}</TableCell>
                                        <TableCell>

                                            <Button variant='outlined' color="secondary" onClick={() => deleteJuego(dato.id)}>
                                                DELETE
                                            </Button>

                                            &nbsp;&nbsp;&nbsp;

                                            <Button variant='outlined' color="inherit"
                                                    onClick={() => obtenerJuegoactual(dato.id)}
                                                    style={{color: "#DBA800", borderColor: "#DBA800"}}>
                                                UPDATE
                                            </Button>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={datos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </>
    );
}
