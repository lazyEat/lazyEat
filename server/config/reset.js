import {pool} from './database.js'
import './dotenv.js'
import { recipesData } from '../data/recipeData.js'

const createTable = async()=>{
    await pool.query('DROP TABLE IF EXISTS recipes')

    await pool.query(`
        CREATE TABLE recipes (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            cook_time_mins INTEGER NOT NULL,
            est_cost NUMERIC(10, 2) NOT NULL,
            ingredients TEXT[] NOT NULL
        )
    `)
}

const seedRecipe = async()=>{
    const insertQuery = `INSERT INTO recipes (title, cook_time_mins, est_cost, ingredients)
             VALUES ($1, $2, $3, $4)`

    for(const recipe of recipesData){
        const values = [recipe.title, recipe.cook_time_mins, recipe.est_cost, recipe.ingredients]
        try {
            await pool.query(insertQuery, values)
            console.log(`[OK] ${recipe.title} added successfully`)
        } catch (error) {
            console.error('error inserting recipe', error)
        }
    }
}

const reset = async()=>{
    await createTable()
    await seedRecipe()
    console.log('Database reset and seeded successfully')
    pool.end()
}

reset()
