import react, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, CardContent, Dialog, Grid, InputLabel, Select, TextField, Typography} from "@material-ui/core";

export default function DialogComponent({setDatos, datosActual, handleClickOpen, isOpen, setIsOpen}){


    const [name, setName] = useState("");
    const [genre, setGenre] = useState("JRPG");
    const [developer, setDeveloper] = useState("");
    const [gameModes, setGameModes] = useState("Single-player");



    const handleNameChange = event => {

        setName(event.target.value);
    }


    const handleGenreChange = event => {

        setGenre(event.target.value);
    }

    const handleDeveloperChange = event => {

        setDeveloper(event.target.value);
    }

    const handleGameModesChange = event => {

        setGameModes(event.target.value);
    }


    function guardarJuegos(data) {

        //post es para insertar elementos en el api
        axios.post(`http://10.0.0.128:88/api/v1/video-games`, data).then(r => {
            setDatos(r.data);
        });
    }

    function actualizarJuego(data) {

        //post es para insertar elementos en el api
        axios.put(`http://10.0.0.128:88/api/v1/video-games`, data).then(r => {
            setDatos(r.data);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let juegosData;

        if (datosActual){

            juegosData = {id: datosActual.id, name, genre, developer, gameModes};

            actualizarJuego(juegosData);
        }

        else {
            juegosData = {name, genre, developer, gameModes};

            guardarJuegos(juegosData);
        }

        handleClose();
    }


    useEffect(() => {

        if (datosActual) {

            setName(datosActual.name);

            setGenre(datosActual.genre);

            setDeveloper(datosActual.developer);

            setGameModes(datosActual.gameModes);
        }

    }, [datosActual]);


    const handleClose = () => {

        setIsOpen(false);

        setName("");

        setGenre("");

        setDeveloper("");

        setGameModes("");
    };


    return(

        <>

            <Button style={{backgroundColor: '#3f51b5',  color: '#fff'}} variant='outlined' color='primary' onClick={handleClickOpen}>
                Agregar Juego
            </Button>

            <Dialog onClose={handleClose} open={isOpen}>


                <Typography gutterBottom variant="h3" align="center" style={{marginTop: "15px"}}>
                    Games-Form
                </Typography>

                <Card style={{maxWidth: 450, margin: "0 auto", padding: "20px 5px"}}>

                    <form onSubmit={handleSubmit}>
                        <CardContent>

                            <Grid container spacing={1}>

                                <Grid xs={12} sm={6} item>
                                    <TextField style={{marginTop: "7%"}} value={name} onChange={handleNameChange}
                                               label="Name" placeholder="Enter name" defaultValue="" variant="outlined" fullWidth
                                               required/>
                                </Grid>

                                <Grid xs={12} sm={6} item>

                                    <InputLabel>Genre</InputLabel>
                                    <Select value={genre} onChange={handleGenreChange} label="Genre"
                                            placeholder="Enter genre" variant="outlined"
                                            fullWidth required  defaultValue="">
                                        <option value="" disabled selected>Select Genre</option>
                                        <option value="Fighting">Fighting</option>
                                        <option value="Hack">Hack</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="JRPG">JRPG</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Simulation">Simulation</option>
                                    </Select>
                                </Grid>

                                <Grid xs={12} item>

                                    <TextField value={developer} onChange={handleDeveloperChange} label="Developer"
                                               placeholder="Enter developer"
                                               variant="outlined" fullWidth required  defaultValue=""/>
                                </Grid>

                                <Grid xs={12} item>

                                    <InputLabel>Game Modes</InputLabel>
                                    <Select value={gameModes} onChange={handleGameModesChange} label="Game Modes"
                                            placeholder="Enter game modes"
                                            variant="outlined" fullWidth required  defaultValue="">
                                        <option value="" disabled selected>Select Game Mode</option>
                                        <option value="Single-player">Single-player</option>
                                        <option value="Multiplayer">Multiplayer</option>
                                        <option value="Single-player, multiplayer">Single-player, multiplayer</option>
                                    </Select>

                                </Grid>

                                <Grid xs={12} item>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Add</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </form>
                </Card>

            </Dialog>


        </>

    );
}
