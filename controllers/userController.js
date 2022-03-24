const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//========================================================================================
/*                                                                                      *
 *                              User Register
 *                                                                                      */
//========================================================================================
module.exports.signUp = async (req, res) => {
  const db = req.app.locals.db;
  const { username, email, password, confirmPassword, bio } = req.body;
  if (!username || !password || !confirmPassword)
    return res
      .status(406)
      .json({ message: "Not all fields have been entered." });
  if (password !== confirmPassword)
    return res
      .status(406)
      .json({ message: "Enter the same password twice for verification." });

  const existingUser = await db.query(
    "SELECT * FROM user_table WHERE username=? OR email=?",
    [username, email]
  );

  if (existingUser[0][0] != null)
    return res.status(406).json({
      message: "An account with this username or email already exists.",
    });
  //all parameters passed
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  try {
    const insert = await db.query(
      "INSERT INTO `user_table`(`username`,`email`,`pass`,`bio`,`profile_pic`) VALUES (?,?,?,?,?)",
      [username, email, passwordHash, bio, ""]
    );
    res.status(200).send({ message: "Success" });
  } catch (message) {
    console.log(message);
    res.status(500).send({ message: "message creating user" });
  }
};

//========================================================================================
/*                                                                                      *
 *                              Check token
 *                                                                                      */
//========================================================================================

module.exports.checkToken = async (req, res) => {
  const db = req.app.locals.db;
  // console.log(req.header("x-auth-token"));
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await db.query("SELECT * FROM user_table WHERE user_id=? ", [
      verified.id,
    ]);
    if (!user[0][0]) return res.json(false);

    return res.status(200).json(user[0][0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                              User get username
 *                                                                                      */
//========================================================================================

module.exports.getusername = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const user = await db.query(
      "SELECT username FROM user_table WHERE user_id=? ",
      [req.params.user_id]
    );
    if (!user[0][0]) return res.json(false);
    return res.status(200).json(user[0][0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                              User Login
 *                                                                                      */
//========================================================================================

module.exports.login = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const { username, password } = req.body;

    // validate
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });

    const user = await db.query("SELECT * FROM user_table WHERE username=? ", [
      username,
    ]);

    const newuser = user[0][0];

    if (!newuser)
      return res.status(400).json({
        message: "No account with this username has been registered.",
      });

    const isMatch = await bcrypt.compare(password, newuser.pass);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: newuser.user_id, username: newuser.username },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      token,
      user: {
        userName: newuser.username,
        id: newuser.user_id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//========================================================================================
/*                                                                                      *
 *                              User update
 *                                                                                      */
//========================================================================================

module.exports.updateuser = async (req, res) => {
  const db = req.app.locals.db;
  const { username, profile_pic, bio } = req.body;
  // console.log(profile_pic);
  try {
    const token = req.header("x-auth-token");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    db.query(
      "update user_table SET username = ?, profile_pic = ?, bio = ? WHERE user_id = ?",
      [username, profile_pic, bio, verified.id]
    );
    res.status(200).send({ message: "Updated information" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
