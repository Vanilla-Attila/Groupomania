const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
// const {
//   is
// } = require('sequelize/types/lib/operators');
const User = require('../Models/user');

// Only for admins
// getAllUser
exports.getAllUsers = async (req, res) => {
  const {
    id
  } = req.body;
  const user = await User.findOne({
    where: {
      id
    }
  });
  if (!user) {
    return res.send({
      message: `User ${id} not found!`
    })
  }
  if (user.is_admin === true) {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers)
  } else {
    return res.status(400).json({
      message: 'Access only available for admins'
    })
  }
};

// Get one user

exports.getOneUser = async (req, res, next) => {
  try {
    const {
      id
    } = req.params
    const user = await User.findOne({
      where: {
        id
      }
    })
    if (!user) {
      return res.send({
        message: `User ${id} not found!`
      })
    }
    return res.send(user)
  } catch (err) {
    res.send({
      message: err.message
    })
  }
}


// Update user
exports.updateUser = async (req, res, next) => {
  const {
    id
  } = req.body
  const {
    first_name,
    last_name,
    password,
    email,
    is_admin
  } = req.body
  const user = await User.findOne({
    where: {
      id
    }
  })
  if (!user) {
    return res.status(400).json({
      message: `User not found with the id of ${id}!`
    })
  }
  try {
    if (first_name || last_name || email || password || is_admin) {
      const newPassword = await bcrypt.hash(password, 10)
      user.first_name = first_name ? first_name : user.first_name
      user.last_name = last_name ? last_name : user.last_name
      user.email = email ? email : user.email
      user.is_admin = is_admin ? is_admin : user.is_admin
      user.save()
      return res.send({
        message: `User ${id} has been updated successfully!`
      })
    }
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`
    })
  }
}



// deleteUser
exports.deleteUser = async (req, res, next) => {
  const {
    id
  } = req.body;
  const user = await User.findOne({
    where: {
      id
    }
  });

  if (!user) {
    return res.status(400).send({
      message: `user ${id} could not be found`,
    });
  }
  try {
    user.destroy();
    res.status(201).json({
      message: `User ${id} deleted successfully!`
    });
  } catch (error) {
    (error) => {
      res.status(500).json({
        error: error.message
      });
    }
  }
}


exports.signup = (req, res, next) => {
  const {
    first_name,
    last_name,
    password,
    email,
    is_admin
  } = req.body;
  console.log(password)

  // hashing the password for 10 rounds
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const newUser = {
        first_name: first_name,
        last_name: last_name,
        password: hash,
        email: email,
        is_admin: is_admin
      };
      User.create(newUser).then(
        () => {
          const user = User.findOne({
            where: {
              email
            }
          }).then((createdUser) => {
            const token = jwt.sign({
                id: createdUser
              },
              'IlikeWakingInTheMorning', {
                expiresIn: '12h'
              }
            );
            res.send({
              id: createdUser.id,
              token: token,
              first_name: createdUser.first_name,
              last_name: createdUser.last_name,
            })
          }).catch((error) => {
            res.send({
              message: error.message
            })
          })
        }).catch(
        (error) => {
          res.send({
            message: error.message
          })
        }
      )
    }
  );
};

exports.login = (req, res, next) => {
  // Checking is the user exist
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(
    (user) => {
      console.log(user.id)
      if (!user) {
        return res.status(404).json({
          message: 'User not found!'
        });
      }
      // If user exist comparing the entered password with the hash
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {

            return res.status(404).json({
              error: 'Invalid password!'
            });
          }
          //  If the password is valid we send back the encoded user id and token
          const token = jwt.sign({
              id: user.id
            },
            'RANDOM_TOKEN_SECRET',
            // token expires in 24h
            {
              expiresIn: '12h'
            });
          res.status(200).json({
            id: user.id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: 'Email or password is not correct'
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: 'Email or password is not correct'
      });
    }
  );
}