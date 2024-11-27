const express = require("express");
const DbConnect = require("./Db/dbConfig");
const todoModel = require("./model/todoModel");
const cors = require("cors");
const app = express();
const port = 3000;
DbConnect();
app.use(express.json());
app.use(cors());
//note: post method addUser
app.post("/user", async (req, res) => {
  let { name, email, age } = req.body;
  let addUser = new todoModel({
    name,
    email,
    age,
  });
  await addUser.save();
  return res
    .status(201)
    .send({ msg: "User Create Successfully", Data: addUser });
});

//note: get method allUser
app.get("/allUser", async (req, res) => {
  let allUser = await todoModel.find({});
  return res.status(200).send({ Success: "ALl Users", Data: allUser });
});

//note: get method singleUser
app.get("/single/user/:id", async (req, res) => {
  let { id } = req.params;
  let singleUser = await todoModel.findOne({ _id: id });
  return res.status(200).send({ msg: "Single User", Data: singleUser });
});

//note: Delete method DeleteUser
app.delete("/delete/user/:id", async (req, res) => {
  let { id } = req.params;
  let DeleteUser = await todoModel.findOneAndDelete({ _id: id });
  return res
    .status(200)
    .send({ msg: "Delete User Successfully", Data: DeleteUser });
});

//note: Patch method UpdateUser
app.patch("/update/user/:id", async (req, res) => {
  let { id } = req.params;
  let { name, email, age } = req.body;
  let UpdateUser = await todoModel.findOneAndUpdate(
    { _id: id },
    { name: name },
    { new: true }
  );
  return res
    .status(200)
    .send({ msg: "Updated User Successfully", Data: UpdateUser });
});
app.use((req, res) => {
  return res.status(404).send("404 Not Found");
});
app.listen(port, () => {
  console.log("Server Is Running");
});
