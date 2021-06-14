const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

// Only for admins
// getAllUser
exports.getAllUsers = (req, res, next) => {
		const users = User.findAll();
		if (users) {
      res.status(201).json(
           users
          );
    }
    else{
    res.status(404).json({
            message: 'Users not found!'
          });
  }
	};


// modifyUser
exports.updateUser = (req, res, next) => {
		const user =  User.findById(req.params.id);
		if (user){
    
    try {
      	user.update(req.body);
        res.status(201).json({
            message: 'User updated successfully!'
          });
    } catch (error) {
      (error) => {
          res.status(500).json({
            error: error
          });
        }
    }}
	else{
    res.status(404).json({
            message: 'User not found!'
          });
  }
}

// deleteUser
exports.deleteUser = (req, res, next) => {
		const user =  db.User.findById(req.params.id);
    try {
      user.destroy();
      res.status(201).json({
            message: 'User deleted successfully!'
          });
    } catch (error) {
      (error) => {
          res.status(500).json({
            error: error
          });
        }
    }		
	}


exports.signup = (req, res, next) => {
  // hashing the password for 10 rounds
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.create().then(
        () => {
          res.status(201).json({
            message: 'User added successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  );
};

exports.login = (req, res, next) => {
  // Checking is the user exist
  User.findOne({where: { email: req.body.email }}).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      // If user exist comparing the entered password with the hash
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          //  If the password is valid we send back the encoded user id and token
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            // token expires in 24h
            { expiresIn: '24h' });
          res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
}

