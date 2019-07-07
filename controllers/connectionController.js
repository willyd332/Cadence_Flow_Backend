const express = require('express');
const router = express.Router();

const User = require('../models/UserSchema');
const Connection = require('../models/ConnectionSchema');

const databaseError = {
  status: 500,
  data: false,
  err: "Connection not found"
}


router.post('/', async (req, res) => {


  const initialContact = new Date().getTime();

  try {

    const newConnection = {
      userId: req.session.userId,
      tags: [],
      name: "",
      company: "",
      email: "",
      address: "",
      birthday: "",
      notes: "",
      urgency: 6,
      lastContacted: initialContact,
    }

    const createdConnection = await Connection.create(newConnection);

    if (createdConnection) {
      res.json({
        status: 200,
        data: createdConnection
      });
    } else {
      res.json(databaseError);
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

router.get('/', async (req, res) => {

  try {

    const foundConnections = await Connection.find({
      userId: req.session.userId
    });

    if (foundConnections) {

      res.json({
        status: 200,
        data: foundConnections
      });

    } else {

      res.json(databaseError);

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

router.put('/:id', async (req, res) => {

  try {

    /// THE NEW:TRUE SHIT ISNT WORKING WTF


    const updatedConnection = await Connection.findByIdAndUpdate(req.params.id, req.body, {new:true});

      if (updatedConnection) {

        res.json({
          status: 200,
          data: updatedConnection
        });

      } else {
        res.json(databaseError);
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

router.delete('/:id', async (req, res) => {

  try {

    const deletedConnection = await Connection.findByIdAndDelete(req.params.id);

    if (deletedConnection) {

      res.json({
        status: 200,
        data: deletedConnection
      });

    } else {

      res.json(databaseError);

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



module.exports = router;
