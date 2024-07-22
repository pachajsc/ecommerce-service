const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hola desde express");
});

app.get("/saludo", (req, res) => {
  //logica de la ruta
  res.send("Hola desde express desde una ruta");
});

const users = [
  {
    id: 1,
    nombre: "maci",
    apellido: "Martin",
    edad: 40,
    email: "email@test.com",
  },
  {
    id: 2,
    nombre: "jose",
    apellido: "Perez",
    edad: 33,
    email: "email1@test.com",
  },
  {
    id: 3,
    nombre: "agus",
    apellido: "Mateico",
    edad: 22,
    email: "email@test.com",
  },
];
app.get("/usuarios", (req, res) => {
  //logica de la ruta
  res.send(users);
});
app.get("/usuario/:id", (req, res) => {
  if (Number.isNaN(+req.params.id)) {
    return res.json({ message: "no es un numero" });
  }
   const user = users.find((u) => u.id === +req.params.id);
  if(!user){
    return res.json({ message: "no existe el usuario" });
  }
 
  res.json(user);
});

app.listen(8080, () => {
  console.log("port 8080");
});
