import express from 'express';
import authController from '../controllers/authController.js';
const router = express.Router();

router.get('/', authController, (req, res) => {

  if (req.user.admin) {
    res.send('Esse dado só deve ser visto pelo Admin');  
  }
  res.status(401).send('Not Admin: Access Denied');
});

router.get('/free', authController, (req, res) => {
  res.send('Esse dado só deve ser visto por quem está logado.');
});

export default router;