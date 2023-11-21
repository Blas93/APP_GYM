require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {
  newUserController,
  getUserController,
  loginController,
  getMeController,
} = require('./controllers/user');

const {
  newActivityController,
  getActivityController,
  modifyActivityController,
  deleteActivityController,
  requireAdmin,
  getActivitiesController,
  getFavoriteListController,
} = require('./controllers/activities');
const { typologyFilter } = require('./db/filterActivities');
const { likeActivityController } = require('./controllers/likes');
const { authenticateUser } = require('./middlewares/authenticateUser');

const app = express();

app.use(express.json());
//agrego el middelware de fireupload para agregar las imagenes
app.use(fileUpload());
app.use(morgan('dev'));
app.use(cors());
app.use('/uploads', express.static('uploads'));

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user', getMeController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

//Rutas de activities
app.get('/activities', authenticateUser, getActivitiesController);
app.post('/activity', requireAdmin, newActivityController);
app.get('/activity/:id', authenticateUser, getActivityController);
app.get('/activities/user', authenticateUser, getFavoriteListController);
app.put('/activity/:id', requireAdmin, modifyActivityController);
app.delete('/activity/:id', requireAdmin, deleteActivityController);
app.get('/activity', typologyFilter);

app.post('/activity/:activityId/like', authenticateUser, likeActivityController);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});
// Lanzamos el servidor
app.listen(3000, () => {
  console.log('Servidor funcionando! 🏋️💪');
});
