const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

async function readRecipes() {
  try {
    const res = await pool.query("select * from recipes");
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.log("Failed to read recipes", err);
  }
}
async function readRecipe(id) {
  try {
    const res = await pool.query("select * from recipes WHERE id =$1", [id]);
    return res.rows[0];
  } catch (err) {
    console.log("Failed to read recipe", err);
  }
}
async function createRecipe(recipe) {
  try {
    await pool.query(
      "insert into recipes (header, recipe, author, date, imageurl, isFavorite, intro) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        recipe.header,
        recipe.recipe,
        recipe.author,
        recipe.date,
        recipe.imageurl,
        recipe.isFavorite,
        recipe.intro,
      ]
    );
  } catch (err) {
    console.log("Failed to create recipe", err);
  }
}

async function deleteRecipes(id) {
  try {
    const res = await pool.query("DELETE FROM recipes WHERE id = $1;", [id]);
    return res.rows;
  } catch (err) {
    console.log("Failed to delete recipe", err);
  }
}

async function likeRecipe(id) {
  await pool.query("update recipes set isFavorite=true where id=$1;", [id]);
}

module.exports = {
  readRecipes,
  readRecipe,
  createRecipe,
  deleteRecipes,
  likeRecipe,
};
