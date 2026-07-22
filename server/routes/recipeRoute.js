import express from 'express'
import {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
} from '../contorllers/recipeController.js'

const router = express.Router()

router.get('/', getAllRecipes)
router.get('/:id', getRecipeById)
router.post('/', createRecipe)
router.patch('/:id', updateRecipe)
router.delete('/:id', deleteRecipe)

export default router