// const e = require("express");
const express = require("express");
const app = express();

app.use(express.json());

let users = [];
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let user = users.find((user) => user.id === id);
  console.log(user);
  res.status(200).json({ status: 200, data: user });
  //   res.json("User", user);
});

app.post("/users", (req, res) => {
  let body = req.body;
  console.log(body);
  let newUser = { ...body, id: users.length + 1 };
  users.push(newUser);
  console.log(users, "From Array");
  res.status(200).json({ status: 200, data: newUser });
});

app.patch("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let userFound = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      // Update only the provided fields in the request body
      users[i] = { ...users[i], ...req.body };
      userFound = true;
      break; // Exit the loop once the user is found and updated
    }
  }

  if (userFound) {
    res
      .status(200)
      .json({ status: "success", data: users.find((user) => user.id === id) });
  } else {
    res.status(404).json({ status: "User Not Found", id: id });
  }
});

app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let userFound = false;

  let index = users.findIndex((user) => user.id === id);
  console.log(index);
  if (index !== -1) {
    users.splice(index, 1);
    for (let i = index; i < users.length; i++) {
      users[i].id = users[i].id - 1;
    }
    userFound = true;
  }

  if (userFound) {
    res.status(200).json({ status: "success", data: id });
  } else {
    res.status(404).json({ status: "User Not Found", id: id });
  }
});

app.listen(3000, () => console.log("Ok"));
