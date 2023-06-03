const { validationResult } = require('express-validator');
const Category = require('../Model/CategoryModel');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract the category data from the request body
        const { name, color, tag_name } = req.body;

        // Create a new category instance
        const category = new Category({
            name,
            color,
            tag_name,
        });

        // Save the category to the database
        const createdCategory = await category.save();

        res.status(201).json(createdCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
