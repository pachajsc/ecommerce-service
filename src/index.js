const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/", (req, res) => {
  res.send("running express with node");
});


app.use("/api", routes);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listen in port ${PORT}`);
});
