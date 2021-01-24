const mongoose = require("mongoose");
const portfolio = require("../db/models/portfolio");
const Portfolio = mongoose.model("Portfolio");

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({});
  return res.json(portfolios);
};

exports.getPortfoliosById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    return res.json(portfolio);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

exports.createPortfolio = async (req, res) => {
  const portfolioData = req.body;
  ///.TODO :Extract from req!
  const userId = req.user.sub;

  //Instance of the model
  //Internal instance of the model
  const portfolio = new Portfolio(portfolioData);
  portfolio.userId = userId;

  try {
    //Storing data in database
    const newPortfolio = await portfolio.save();
    return res.json(newPortfolio);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

exports.updatePortfolio = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  try {
    //Storing data in database
    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { _id: id },
      body,
      { new: true, runValidators: true }
    );
    return res.json(updatedPortfolio);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

exports.deletePortfolio = async (req, res) => {
  const portfolio = await Portfolio.findOneAndRemove({ _id: req.params.id });
  return res.json({ _id: portfolio.id });
};
