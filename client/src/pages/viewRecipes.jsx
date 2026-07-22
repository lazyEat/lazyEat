import { useEffect, useState } from 'react'
import { getAllRecipes } from '../services/recipesApi.jsx'
import Card from '../components/Card.jsx'
import './viewRecipes.css'
const ViewRecipes = ({ title }) => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    document.title = title
    getAllRecipes().then(setRecipes)
  }, [title])

  return (
    <div className='view-recipes'>
      
      <div className='card-list'>
        {recipes.map(recipe => (
          <Card
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            cook_time_mins={recipe.cook_time_mins}
            est_cost={recipe.est_cost}
          />
        ))}
      </div>
    </div>
  )
}

export default ViewRecipes
