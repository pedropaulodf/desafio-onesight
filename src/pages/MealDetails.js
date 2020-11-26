import { Link, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header'
import api from '../services/api';
import urlTheMealDB from '../utils/Utils';
import { CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';

/*
  Tela de detalhes da receita
*/

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // marginBottom: 20
  },
  media: {
    height: 160,
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0px 0px 0px',
    marginBottom: '20px'
  },
  preloader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
    
}));

export default function MealDetails() {
  const classes = useStyles();

  const match = useRouteMatch();

  const [allMealDetails, setAllMealDetails] = useState([]);

  useEffect(() => {
    console.log(match.params.id);
    const mealId = match.params.id;

    const getAllMealsDetails = async () => {
      const data = await api.get(`${urlTheMealDB}/lookup.php?i=${mealId}`).then(response => {
        return response.data;
      });
      console.log(data);
      setAllMealDetails(data);
    }
    
    getAllMealsDetails();

  },[]);

  return (
    <div>
      <Header></Header>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          Meal Recipe
        </Typography>
      </Paper>
      {allMealDetails.length === 0 
        ? <div className={classes.preloader}>
            <CircularProgress /> 
          </div>
        : (
          allMealDetails.meals.map(meal => {
            return (
              <div key={meal.idMeal}>
                <img src={meal.strMealThumb} alt="" width="50"/>
                <h5>{meal.strMeal}</h5>
                <p>{meal.strYoutube}</p>
                <p>{meal.strCategory}</p>
                <p>{meal.strArea}</p>
                <p>{meal.strDrinkAlternate}</p>
                <p>{meal.strIngredient1}</p>
                <p>{meal.strMeasure1}</p>
                <p>{meal.strSource}</p>
                <p>{meal.strTags}</p>
                <p>{meal.strInstructions}</p>
              </div>
            )
          })
        )
      }
    </div>
  )
}
