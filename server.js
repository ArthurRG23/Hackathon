const Express = require("express");
const Mongoose = require("mongoose");
const cors = require("cors");
const BodyParser = require("body-parser");
Mongoose.connect(
  "mongodb+srv://cugler:1022890244@hackathon-3lkrb.mongodb.net/hackathon?retryWrites=true&w=majority"
);
var app = Express();

app.use(cors());

const UsuarioModel = Mongoose.model("person", {
  nomeId: String,
  resId: String
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.post("/usuario", async (request, response) => {
  try {
    console.log(request.body);
    var person = new UsuarioModel(request.body);
    var result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/usuario/:id", async (request, response) => {
  try {
    var person = await UsuarioModel.findById(request.params.id).exec();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Listening at :3000...");
});
