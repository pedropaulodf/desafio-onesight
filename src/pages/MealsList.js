import Header from '../components/Header'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import urlTheMealDB from '../utils/Utils';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useFlexLayout } from 'react-table';

/*
  Tabela com foto, nome, categoria e link para vídeo da receita
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

export default function MealsList() {
  const classes = useStyles();
  const history = useHistory();

  const match = useRouteMatch();

  const [allMealsByCategory, setAllMealsByCategory] = useState([]);

  useEffect(() => {
    console.log(match.params.id);
    const idCategory = match.params.id;

    const getAllMealsByCategory = async () => {
      const data = await api.get(`${urlTheMealDB}/filter.php?c=${idCategory}`).then(response => {
        return response.data;
      });
      console.log(data);
      setAllMealsByCategory(data);
    }
    
    getAllMealsByCategory();

  },[]);

  function handleClickGoToMealsCategoryList(idCategory) {
    history.push(`/details/${idCategory}`);
  }

  return (
    <div>
      <Header></Header>
      <Container maxWidth="md">
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          Meal Category List
        </Typography>
      </Paper>

        <Grid container spacing={3}>
      {allMealsByCategory.length === 0 
        ? <div className={classes.preloader}>
            <CircularProgress /> 
          </div>
        : (
          allMealsByCategory.meals.map(meal => {
            return (
              // <div key={meal.idMeal}>
              //   <img src={meal.strMealThumb} alt="" width="50"/>
              //   <h5>{meal.strMeal}</h5>
              //   <Link to={`/details/${meal.idMeal}`}>Ver a receita</Link>
              // </div>

              <Grid item xs={12} sm={6} md={4} key={meal.idMeal}>
              <Card>
                <CardActionArea
                  onClick={() =>
                    handleClickGoToMealsCategoryList(meal.idMeal)
                  }
                >
                  <CardMedia
                    className={classes.media}
                    image={meal.strMealThumb}
                    title={`${meal.strMeal} category image`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {meal.strMeal}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                      handleClickGoToMealsCategoryList(meal.idMeal)
                    }
                  >
                    See the recipe
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            )
          })
        )
      }
      </Grid>
      </Container>
    </div>
  )
}
