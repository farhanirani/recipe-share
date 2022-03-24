const router = require("express").Router();
const auth = require("./middleware/auth");

//========================================================================================
/*                                                                                      *
 *                              User Routes
 *                                                                                      */
//========================================================================================

const User = require("./controllers/userController");

router.post("/user/register", User.signUp);
router.post("/user/login", User.login);
router.patch("/user/updateuser", auth, User.updateuser);
router.get("/user/checkToken", User.checkToken);

// router.get("/user/getusername/:userid", User.getusername);

// //========================================================================================
// /*                                                                                      *
//  *                              Recipe Routes
//  *                                                                                      */
// //========================================================================================

const Recipe = require("./controllers/recipeController");

router.get("/recipe/all/:category", Recipe.getAllRecipe);
router.post("/recipe/create", auth, Recipe.createRecipe);
router.get("/recipe/:id", Recipe.getRecipe);
// router.delete("/recipe/delete/:recipeid", auth, Recipe.deleteRecipe);

module.exports = router;
