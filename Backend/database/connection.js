const Sequelize = require('sequelize');

const sequelize = new Sequelize('database_development', 'postgres', '121212', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(() => {
  console.log('Connection to postgres is ok!')
}).catch((error) => {
  console.log('Unable to connect to db!', error)
});

module.exports = sequelize;