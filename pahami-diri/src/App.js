import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeskripsiContext = createContext();

function App(props) {
    const [artikel, setArtikel] = useState([]);
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
            <AppBar style={{ padding: "20px", backgroundColor: "#fff", marginBottom: "150px" }}>
                <Typography style={{ color: "#383536", fontSize: "1.5em",fontWeight: "900" }}>{props.title}</Typography>
            </AppBar>
            <Card sx={{ maxWidth: 1600, margin: "auto", marginTop: "60px"}}>
                <CardMedia
                    component="img"
                    height="600"
                    image={props.image}
                    alt="Self Love"
                />
            </Card>
            <Container style={{marginTop: "50px" }} maxWidth>
                <Typography style={{ margin: "auto", color: "#383536", fontSize: "1.5em", fontWeight: "bold" }}>Pentingnya Memahami Diri</Typography>
                <Grid container spacing={4} style={{ textAlign: "center"}}>
                    <Grid item xs={4}>
                        <CardMedia sx={{ maxWidth: 500, margin: "10px 0"}}
                            component="img"
                            image="https://image.freepik.com/free-psd/3d-female-character-with-question-marks_23-2148938890.jpg"
                            alt="Kebutuhan Diri"
                        />
                        <Typography style={{ color: "#383536", fontWeight: "bold"}}>Memahami apa yang dibutuhkan</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia sx={{ maxWidth: 500, margin: "10px 0"}}
                            component="img"
                            image="https://image.freepik.com/free-psd/3d-female-character-thinking-about-something_23-2148938891.jpg"
                            alt="Kelebihan Kekurangan"
                        />
                        <Typography style={{ color: "#383536", fontWeight: "bold"}}>Mengetahui kelebihan dan kekurangan</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia sx={{ maxWidth: 500, margin: "10px 0"}}
                            component="img"
                            image="https://image.freepik.com/free-psd/3d-female-character-reaching-finish-line_23-2148938910.jpg"
                            alt="Tujuan"
                        />
                        <Typography style={{ color: "#383536", fontWeight: "bold"}}>Mencapai tujuan hidup, cita-cita</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container style={{marginTop: "50px" }} maxWidth>
                <Typography style={{ margin: "auto", color: "#383536", fontSize: "1.5em", fontWeight: "bold" }}>Blog</Typography>    
                <Grid container spacing={4} style={{ marginTop: "10px", marginBottom: "30px"}}>
                    {artikel.map((results) => {
                        return (
                            <Grid item key={results.name} md={3}>
                                <Card variant="outlined">
                                    <CardActionArea onClick={() => {setOpen(true); setContent(results.image)}}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={results.image}
                                            alt={results.title}
                                        />
                                    </CardActionArea>
                                    <CardContent style={{ height: "120px" }}>
                                        <Typography variant="h5">{results.title}</Typography>
                                        <Typography variant="body2">{results.author}​​​​​​</Typography>
                                        <Typography variant="caption"> {results.date}​​​​​​</Typography>
                                        
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" target="_blank" href={results.source}>Baca Selengkapnya</Button>
                                    </CardActions>  
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
            <Container style={{marginTop: "50px", textAlign: "center", backgroundColor: "black" }} maxWidth>
                <Typography style={{ margin: "auto", color: "white", padding: "20px"}}>PahamiDiri - 2021</Typography>
            </Container>
            <DeskripsiContext.Provider value={{desc:content}}>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Gambar/>    
                    </Modal>
                </div>
            </DeskripsiContext.Provider>
        </div>
    );
}

function Gambar() {
    const info = useContext(DeskripsiContext);
    return (
        <Box sx={style}>
            <CardMedia
                component="img"
                image={info.desc}
                alt="Detail gambar"
            />
        </Box>
    );
}

export default App;
