import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from '../services/recipesApi.jsx'
import './recipeDetail.css'
import './editRecipe.css'

const CreateRecipe = ({ title }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    cook_time_mins: '',
    est_cost: '',
    ingredients: ''
  })

  useEffect(() => {
    document.title = title
  }, [title])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const recipe = await createRecipe({
      title: form.title,
      cook_time_mins: Number(form.cook_time_mins),
      est_cost: Number(form.est_cost),
      ingredients: form.ingredients.split(',').map(i => i.trim()).filter(Boolean)
    })
    navigate(`/recipes/${recipe.id}`)
  }

  return (
    <form className='card recipe-detail edit-recipe' onSubmit={handleSubmit}>
      <div className='card-top'>
        <h3>Create Recipe</h3>
      </div>

      <div className='card-bottom'>
        <label>
          Title
          <input name='title' value={form.title} onChange={handleChange} />
        </label>

        <label>
          Cook time (mins)
          <input name='cook_time_mins' type='number' value={form.cook_time_mins} onChange={handleChange} />
        </label>

        <label>
          Estimated cost ($)
          <input name='est_cost' type='number' value={form.est_cost} onChange={handleChange} />
        </label>

        <label>
          Ingredients (comma separated)
          <textarea name='ingredients' value={form.ingredients} onChange={handleChange} />
        </label>

        <div className='card-actions'>
          <button type='submit' className='btn btn-update'>Create</button>
        </div>
      </div>
    </form>
  )
}

export default CreateRecipe
