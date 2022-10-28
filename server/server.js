require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();

//ROUTE for DATABASE

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});

//ROUTE for FRONTEND
app.use(express.json());

const {
  getAllLists,
  getAllItemsFromList,
  getUserData,
  getAllUsersInList,
  getAllListsOnUser
} = require("./handler/knex.get");

const {
  addList,
  addUser,
  addItemToList,
  addUserTolist
} = require("./handler/knex.post")

const {
  deleteUser,
  deleteList,
  deleteItem,
  deleteUserFromList
} = require("./handler/knex.delete")

//GET METHOD

//app.get tests
app.get("/api", async (req, res) => {
  console.log("Hello World");
  await res.send("Hello World");
});

//user data
app.get("/api/user/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  await getUserData(userId).then((data) => {
    console.log(data);
    res.send(data);
  });
});

//all lists data
app.get("/api/lists", async (req, res) => {
  await getAllLists().then((data) => {
    console.log(data);
    res.send(data);
  });
});

//all items in list
app.get("/api/items/:listId", async (req, res) => {
  const listId = Number(req.params.listId);
  await getAllItemsFromList(listId).then((data) => {
    console.log(data);
    res.send(data);
  });
});

//all users in list
app.get("/api/users-in-list/:listId", async (req, res) => {
  const listId = Number(req.params.listId);
  await getAllUsersInList(listId).then((data) => {
    console.log(data);
    res.send(data);
  });
});

//all lists user have (listId)
app.get("/api/lists-on-user/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  await getAllListsOnUser(userId).then((data) => {
    console.log(data);
    res.send(data);
  });
});

//POST METHOD

app.post("/api/user", async (req, res) => {
  await addUser(req.body);

  res.send(JSON.stringify(req.body));
})

//create list
app.post("/api/user/:userId/add-list", async (req, res) => {
  const userId = Number(req.params.userId);
  req.body.userId = userId;
  await addList(req.body);
  res.send(JSON.stringify(req.body));
});

//add items to list 
app.post("/api/list/:listId/add-item", async (req, res) => {
  const listId = Number(req.params.listId);
  await addItemsTolist(req.body, listId)
  // req.body.listId = listId;

  console.log(req.body);
  await addItemToList(req.body, id);
  res.send(JSON.stringify(req.body));
});

//add user to list
app.post("/api/list:listId/add-user", async (req, res) => {
  await addUserTolist(req.body)
})

//DELETE METHOD

app.delete("/api/delete/user/:userId", async (req, res) => {

  await deleteUser(userId)
})

app.delete("/api/delete/list/:listId", async (req, res) => {

  await deleteList(listId)
})

app.delete("/api/delete/item", async (req, res) => {

  await deleteUserFromList(req.body)
})


app.delete("/api/delete/user-list", async (req, res) => {
  await deleteUserFromList(req.body)
})

// app.post("api/access", async (req, res) => {
//   const dbCode = await checkCode(req.body)
//   if (dbCode === req.body.code) {
//     res.send({ granted: true })
//   }
// })
