import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeskripsiContext = createContext();

function App() {
    const [artikel, setArtikel] = useState([]);
    //const [merk, setMerk] = useState('');
    //const [spek, setSpek] = useState([]);
    const [content, setContent] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3000/data",
            headers: {
                accept: "*/*",
            },
        })
        
        .then((data) => {
            setArtikel(data.data);
        })
        
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div style={{ marginTop: 20 }}>
            <AppBar style={{ padding: "20px", marginBottom: "150px" }}>
                <Typography style={{ margin: "auto" }}>Pahami Diri</Typography>
            </AppBar>
            
            <Grid container md={11} spacing={4} style={{margin: "auto", marginTop: "50px"}}>
                {artikel.map((results) => {
                    return (
                        <Grid item key={results.name} md={3}>
                            <Card variant="outlined">
                                <CardMedia
                                    component="img"
                                    image={results.image}
                                    alt={results.title}
                                />
                                <CardActionArea onClick={() => {setOpen(true); setContent(results.content)}}>
                                    <CardContent style={{ backgroundColor: '#efefff', height: "120px" }}>
                                        <Typography variant="body2">{results.title}</Typography>
                                        <Typography variant="caption">{results.author}​​​​​​</Typography>
                                        <Typography variant="caption"> {results.date}​​​​​​</Typography>
                                        <Button size="small">Baca Selengkapnya</Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <DeskripsiContext.Provider value={{desc:content}}>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Deskripsi/>    
                    </Modal>
                </div>
            </DeskripsiContext.Provider>
        </div>
    );
}

function Deskripsi() {
    const info = useContext(DeskripsiContext);
    return (
        <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {info.desc}
            </Typography>
        </Box>
    );
}

export default App;
