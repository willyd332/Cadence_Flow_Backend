const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/UserSchema');

const incorrectInfo = {
  status: 200,
  data: false,
}


router.post('/login', async (req, res) => {

  console.log('Receiving Request');

  try {

    const foundUser = await User.findOne({
      username: req.body.username
    });

    if (foundUser) {

      let matching = await bcrypt.compareSync(req.body.password, foundUser.password);

      if (req.body.id.toString() == foundUser._id.toString()){

        matching = true;

      }

      if (matching === true) {

        console.log("logging in " + req.body.username);

        req.session.logged = true;
        req.session.userId = foundUser._id;

        res.json({
          status: 200,
          data: foundUser,
        });

      } else {
        res.json(incorrectInfo);
      }
    } else {
      res.json(incorrectInfo);
    }

  } catch (err) {
    console.log(err);

    res.json({
      status: 500,
      data: false,
      err: err
    });
  }
});


router.post('/register', async (req, res) => {

  const password = req.body.password;

  console.log(req.body);

  const passwordHash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = {
    username: req.body.username,
    password: passwordHash
  };

  try {

    const createdUser = await User.create(newUser);

    if (createdUser) {

      req.session.logged = true;
      req.session.userId = createdUser._id;

      res.json({
        status: 200,
        data: createdUser,
      });

    } else {

      res.json(incorrectInfo);

    }

  } catch (err) {
    console.log(err);

    res.json({
      status: 500,
      data: false,
      err: err
    });
  }



});



router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.json({
        status: 500,
        data: false,
        err: err
      });
    } else {
      res.redirect("/");
    }
  })
});


router.get('/session', (req, res) => {

  if (req.session.logged){

    res.json({
      data: req.session.userId,
      status: 200
      });

  } else {

    res.json({
      status: 500
      });

  }
});



module.exports = router;
