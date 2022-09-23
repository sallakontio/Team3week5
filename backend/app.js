const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const {
  readRecipe,
  readRecipes,
  createRecipe,
  deleteRecipes,
  likeRecipe,
} = require("./database");

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const recipes = await readRecipes();
  const response = { data: recipes };
  res.send(response);
});

app.get("/:id", async (req, res) => {
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

app.post("/toggle-favorite/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Add likes");
  await likeRecipe(id);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
