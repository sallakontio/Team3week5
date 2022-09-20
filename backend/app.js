const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const {
  readRecipe,
  readRecipes,
  createRecipe,
  deleteRecipes,
  likeRecipe,
  unlikeRecipe,
} = require("./database");

app.get("/recipe", async (req, res) => {
  console.log("Reading recipies");
  return res.json(await readRecipes());
});

app.get("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`Reading recipe at ${id}`);
  res.json(await readRecipe(id));
});

app.post("/recipe", async (req, res) => {
  console.log("Creating recipe");
  await createRecipe(req.body);
  res.sendStatus(200);
});

app.delete("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`Deleted recipe at id point ${id}`);
  await deleteRecipes(id);
  res.sendStatus(200);
});

app.post("/toggle-likes/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Add likes");
  await likeRecipe(id);
  res.sendStatus(200);
});

// app.delete("/toggle-likes/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log("Remove like");
//   await unlikeRecipe(id);
//   res.sendStatus(200);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
