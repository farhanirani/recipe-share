const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//========================================================================================
/*                                                                                      *
 *                  getAllRecipe
 *                                                                                      */
//========================================================================================

module.exports.getAllRecipe = async (req, res) => {
  const db = req.app.locals.db;
  const category = req.params.category;

  try {
    if (category != 0) {
      querydata = await db.query(
        "SELECT * FROM recipe_table WHERE category_id=? ORDER BY views_count DESC",
        [category]
      );
    } else {
      querydata = await db.query(
        "SELECT * FROM recipe_table ORDER BY views_count DESC"
      );
    }
    // console.log(querydata[0]);
    res.status(200).json(querydata[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                create recipe
 *                                                                                      */
//========================================================================================

module.exports.createRecipe = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const token = req.header("x-auth-token");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    user_id = verified.id;

    const {
      recipe_name,
      recipe_desc,
      recipe_image,
      time,
      category_id,
      recipe_ingredients,
      recipe_steps,
    } = req.body;
    console.log(req.body);

    const querydata = await db.query(
      "INSERT INTO recipe_table(creator_id, recipe_name, recipe_desc, recipe_image, no_steps, time_required, category_id) VALUES (?,?,?,?,?,?,?)",
      [
        user_id,
        recipe_name,
        recipe_desc,
        recipe_image,
        recipe_steps.length,
        time,
        parseInt(category_id),
      ]
    );
    // console.log(querydata[0].insertId);

    // ingredients table

    for (var i = 0; i < recipe_ingredients.length; i++) {
      var query2 = await db.query(
        "INSERT INTO recipe_ingredients_table(recipe_id,instructions) VALUES(?,?)",
        [querydata[0].insertId, recipe_ingredients[i]]
      );
    }

    // // steps table

    for (var i = 0; i < recipe_ingredients.length; i++) {
      var query2 = await db.query(
        "INSERT INTO step_table(recipe_id,instructions) VALUES(?,?)",
        [querydata[0].insertId, recipe_steps[i]]
      );
    }

    res.status(200).json({ message: "Created successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                   getRecipe
 *                                                                                      */
//========================================================================================

module.exports.getRecipe = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const id = req.params.id;

    const querydata = await db.query(
      "SELECT * FROM recipe_table WHERE recipe_id = ?",
      [id]
    );
    const querydata2 = await db.query(
      "SELECT * FROM recipe_ingredients_table WHERE recipe_id = ?",
      [id]
    );
    const querydata3 = await db.query(
      "SELECT * FROM step_table WHERE recipe_id = ?",
      [id]
    );
    const querydata4view = await db.query(
      "UPDATE recipe_table SET views_count = views_count + 1 WHERE recipe_id = ?",
      [id]
    );
    const mega = [querydata[0], querydata2[0], querydata3[0]];
    // console.log(mega);
    res.status(200).json(mega);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                   delete recipe
 *                                                                                      */
//========================================================================================

module.exports.deleteRecipe = async (req, res) => {
  const db = req.app.locals.db;

  try {
    const recipeid = req.params.recipeid;

    const querydata = await db.query(
      "DELETE FROM recipe_table WHERE recipe_id = ?",
      [recipeid]
    );
    res.status(200).json({ message: "Recipe removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
