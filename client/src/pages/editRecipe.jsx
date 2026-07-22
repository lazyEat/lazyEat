import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeById, updateRecipeById } from '../services/recipesApi.jsx'
import './recipeDetail.css'
import './editRecipe.css'

const EditRecipe = ({ title }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)

  useEffect(() => {
    document.title = title
    getRecipeById(id).then(recipe => setForm({
      title: recipe.title,
      cook_time_mins: recipe.cook_time_mins,
      est_cost: recipe.est_cost,
      ingredients: (recipe.ingredients || []).join(', ')
    }))
  }, [title, id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateRecipeById({
      title: form.title,
      cook_time_mins: Number(form.cook_time_mins),
      est_cost: Number(form.est_cost),
      ingredients: form.ingredients.split(',').map(i => i.trim()).filter(Boolean)
    }, id)
    navigate(`/recipes/${id}`)
  }

  if (!form) return null

  return (
    <form className='card recipe-detail edit-recipe' onSubmit={handleSubmit}>
      <div className='card-top'>
        <h3>Edit Recipe</h3>
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
          <button type='submit' className='btn btn-update'>Save</button>
        </div>
      </div>
    </form>
  )
}

export default EditRecipe
