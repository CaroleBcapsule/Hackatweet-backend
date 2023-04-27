var express = require("express");
var router = express.Router();
//import du modele users
const User = require("../models/users");

//import des modules de hachage et de cryptage password
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

//import de la fonction checkBody
const { checkBody } = require("../modules/checkBody");

//route d'inscription
router.post("/signup", (req, res) => {
  //verification des champs
  if (!checkBody(req.body, ["firstname", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  //Verification si le nom d'utilisateur a déja été utilisé
  User.findOne({ username: req.body.username }).then((data) => {
    //si nom d'utilisateur dispo
    if (data === null) {
      //hachage du password
      const hash = bcrypt.hashSync(req.body.password, 10);
      //creation de l'utilisateur
      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });
      //enregistrement dans la BDD
      newUser.save().then((newUserRegistred) => {
        res.json({ result: true, user: newUserRegistred });
      });
    } else {
      // Nom d'utilisateur deja pris
      res.json({ result: false, error: "User already exists" });
    }
  });
});

//route de connexion
router.post("/signin", (req, res) => {
  //verification des champs
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    //verification des correspondance du couple username et password
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
