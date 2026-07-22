import { pool } from '../config/database.js'

const getAllRecipes = async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes ORDER BY id')
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getRecipeById = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const createRecipe = async(req, res) => {
    try {
        const { title, cook_time_mins, est_cost, ingredients } = req.body
        const result = await pool.query(
            `INSERT INTO recipes (title, cook_time_mins, est_cost, ingredients)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [title, cook_time_mins, est_cost, ingredients]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const updateRecipe = async(req, res) => {
    try {
        const { id } = req.params
        const { title, cook_time_mins, est_cost, ingredients } = req.body
        const result = await pool.query(
            `UPDATE recipes
             SET title = $1, cook_time_mins = $2, est_cost = $3, ingredients = $4
             WHERE id = $5 RETURNING *`,
            [title, cook_time_mins, est_cost, ingredients, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' })
        }
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const deleteRecipe = async(req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM recipes WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' })
        }
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
