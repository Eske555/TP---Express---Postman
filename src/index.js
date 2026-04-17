import express from "express";
import cors from "cors";

import Alumno from "./models/alumno.js";
import { sumar, restar, multiplicar, dividir } from "./modules/matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./modules/omdb-wrapper.js";



const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('¡Ya estoy respondiendo!');
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});

app.get('/saludar/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  res.status(200).send(`Hola ${nombre}`);
});

app.get('/validarfecha/:anio/:mes/:dia', (req, res) => {
  const { anio, mes, dia } = req.params;

  const fechaStr = `${anio}-${mes}-${dia}`;
  const fecha = Date.parse(fechaStr);

  if (isNaN(fecha)) {
    return res.status(400).send("Fecha inválida");
  }

  res.status(200).send("Fecha válida");
});

const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

app.get('/alumnos', (req, res) => {
  res.status(200).send(alumnosArray);
});

app.get('/alumnos/:dni', (req, res) => {
  const dni = req.params.dni;

  const alumno = alumnosArray.find(a => a.dni === dni);

  if (!alumno) {
    return res.status(404).send("Alumno no encontrado");
  }

  res.status(200).send(alumno);
});

app.post('/alumnos', (req, res) => {
  const { username, dni, edad } = req.body;

  if (!username || !dni || !edad) {
    return res.status(400).send("Datos incompletos");
  }

  const nuevoAlumno = new Alumno(username, dni, edad);
  alumnosArray.push(nuevoAlumno);

  res.status(201).send(nuevoAlumno);
});

app.delete('/alumnos', (req, res) => {
  const { dni } = req.body;

  const index = alumnosArray.findIndex(a => a.dni === dni);

  if (index < 0) {
    return res.status(404).send("Alumno no encontrado");
  }

  alumnosArray.splice(index, 1);

  res.status(200).send("Alumno eliminado");
});

app.get('/matematica/sumar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).send("Parámetros inválidos");
  }
  res.status(200).send(String(sumar(n1, n2)));
});

app.get('/matematica/restar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) {
  return res.status(400).send("Parámetros inválidos");
  }
  res.status(200).send(String(restar(n1, n2)));
});

app.get('/matematica/multiplicar', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) {
  return res.status(400).send("Parámetros inválidos");
  }
  res.status(200).send(String(multiplicar(n1, n2)));
});

app.get('/matematica/dividir', (req, res) => {
  const n1 = parseInt(req.query.n1);
  const n2 = parseInt(req.query.n2);

  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).send("Parámetros inválidos");
  }
  if (n2 === 0) {
    return res.status(400).send("No se puede dividir por 0");
  }
  res.status(200).send(String(dividir(n1, n2)));
});

app.get('/omdb/searchbypage', async (req, res) => {
  const { search, p } = req.query;

  try {
    const data = await OMDBSearchByPage(search, p);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Hubo un error al consultar OMDB");
  }
});

app.get('/omdb/searchcomplete', async (req, res) => {
  const { search } = req.query;

  try {
    const data = await OMDBSearchComplete(search);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Hubo un error al consultar OMDB");
  }
});

app.get('/omdb/getbyomdbid', async (req, res) => {
  const { imdbID } = req.query;

  try {
    const data = await OMDBGetByImdbID(imdbID);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Hubo un error al consultar OMDB");
  }
});