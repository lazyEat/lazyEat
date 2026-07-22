import { useRoutes } from 'react-router-dom'
import Header from './components/Header.jsx'
import ViewRecipes from './pages/viewRecipes.jsx'
import RecipeDetail from './pages/recipeDetail.jsx'
import EditRecipe from './pages/editRecipe.jsx'
import CreateRecipe from './pages/createRecipe.jsx'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <ViewRecipes title='Lazy Eats | Recipes' />
    },
    {
      path: '/recipes/new',
      element: <CreateRecipe title='Lazy Eats | New Recipe' />
    },
    {
      path: '/recipes/:id',
      element: <RecipeDetail title='Lazy Eats | Recipe' />
    },
    {
      path: '/recipes/:id/edit',
      element: <EditRecipe title='Lazy Eats | Edit Recipe' />
    }
  ])

  return (
    <div className='app'>

      <Header />

      { element }

    </div>
  )
}

export default App
