
const Portfolio = require('../models/portfolio');

const getPortfolios = async(req, res) =>{
    await Portfolio.find({}).exec((err,portfolios)=>{
        if (err){
            return res.status(400).json(err)
        }
        res.json(portfolios);
    });
}

const getPortfolioById = async(req,res) =>{
    let id = req.params.id;
    await Portfolio.findById(id).exec((err,portfolio) =>{
        if (!portfolio){
            return res.status(500).json({message:'portfolio not found'});
        }
        if (err){
            return res.status(500).json({err,message:'This is our fault our API FAIL :('});
        }
        res.json(portfolio);
    });
}

const getPortfolioBySlug = async(req,res) =>{
    await Portfolio.findOne({slug:req.params.slug}).exec((err,portfolio) =>{
        if (!portfolio){
            return res.status(500).json({message:'portfolio not found'});
        }
        if (err){
            return res.status(500).json({err,message:'This is our fault our API FAIL :('});
        }
        res.json(portfolio);
    });

}


const createPortfolio = async(req, res) =>{
    const portfolioData = req.body;
    const userId = req.user.sub;
    let portfolio = new Portfolio(portfolioData);
    portfolio.userId = userId;
    await portfolio.save((err, portfolioDB)=>{
        if (err){
            return res.status(400).json(err)
        }
        res.json({data: portfolioDB});
    })
}

const updatePortfolio = async(req,res) => {
    const {body,params:{id}} =req;
    await Portfolio.findOneAndUpdate({_id:id},body,{new:true,runValidators:true},(err,updatedPortfolio)=>{
        if (err){
            return res.status(422).json(err)
        }
        res.json({data:updatedPortfolio});
    });
}

const deletePortfolio = async(req,res) => {
    await Portfolio.findOneAndRemove({_id:req.params.id},(err,deletedPortfolio)=>{
        if (err){
            return res.status(500).json(err)
        }
        if(!deletedPortfolio){
            return  res.status(404).json({err:'User not found'});
        }
        return res.json({data: deletedPortfolio});
    });
}

module.exports ={
    getPortfolios,
    getPortfolioById,
    getPortfolioBySlug,
    savePortfolio: createPortfolio,
    updatePortfolio,
    deletePortfolio
}