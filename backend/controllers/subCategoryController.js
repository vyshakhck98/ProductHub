const SubCategory = require("../models/SubCategory");

const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    const subCategory = await SubCategory.create({
      name,
      category,
    });

    res.status(201).json({
      success: true,
      subCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");

    res.status(200).json({
      success: true,
      subCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubCategory,
  getSubCategories,
};
