const express = require('express');
const router = express.Router();
const portfoliosController = require('../controllers/portfolios');
const { checkJwt,checkRole} = require('../controllers/auth')

router.get('/',portfoliosController.getPortfolios);
router.get('/:id',portfoliosController.getPortfolioById);

router.post('/',checkJwt,checkRole('admin'),portfoliosController.savePortfolio);
router.patch('/:id',checkJwt,checkRole('admin'),portfoliosController.updatePortfolio);
router.delete('/:id',checkJwt,checkRole('admin'),portfoliosController.deletePortfolio);

module.exports = router;

