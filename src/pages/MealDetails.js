import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../services/api";
import {urlTheMealDB} from "../utils/Utils";
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkIcon from '@material-ui/icons/Link';
import PublicIcon from '@material-ui/icons/Public';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Skeleton } from "@material-ui/lab";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

/*
  Tela de detalhes da receita
*/

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // marginBottom: 20
  },
  media: {
    height: 500,
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0px 0px 0px",
    marginBottom: "20px",
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCenter: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  preloader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  title: {
    fontSize: 14,
  },
  padding: {
    padding: '20px 20px 10px 20px'
  },
  marginBottom: {
    marginBottom: '20px'
  },
  noTextStyle: {
    textDecoration: 'none',
  },
  txtBtnYoutube: {
    fontSize: 20,
    color: 'white',
  },
  btnYoutube: {
    backgroundColor: '#e23b3b',
    display: 'flex',
    minHeight: '70px',
  },
  txtBtnSource: {
    fontSize: 20,
    color: 'white',
  },
  btnSource: {
    backgroundColor: 'green',
    display: 'flex',
    minHeight: '70px',
  },
  ingredientsColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '10px',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
  ingredientBox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '1px solid #efefef',
    borderRadius: '6px',
    padding: '3px',
    '&:hover': {
      boxShadow: '0px 2px 3px 0px rgba(0,0,0,.2)',
   },
  },
  ingredientBoxImage: {
    width: '40px',
    marginRight: '10px',
  },
  ingredientBoxName: {
    fontSize: 14,
  }
  
}));

export default function MealDetails() {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();

  const [allMealDetails, setAllMealDetails] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  
  useEffect(() => {
    const mealId = match.params.id;

    const getAllMealsDetails = async () => {
      const data = await api
        .get(`${urlTheMealDB}/lookup.php?i=${mealId}`)
        .then((response) => {
          return response.data;
        });
        
      data.meals.map((meal) => {
        for (let i = 0; i < 20; i++) {
          if (meal[`strIngredient${i}`]) {
            allIngredients.push({ingredient : meal[`strIngredient${i}`], measure: meal[`strMeasure${i}`]});
          };
        };
      });

      setAllMealDetails(data);

    };

    getAllMealsDetails();
  }, []);

  function handleGoBackButtonClick() {
    history.goBack();
  }

  return (
    <div>
      <Header></Header>
      <Container maxWidth="md">
        <Button fullWidth size="large" color="primary" variant="outlined" style={{marginBottom: '10px'}} onClick={handleGoBackButtonClick}>
          Go back
        </Button>
        <Grid container spacing={3}>
          {allMealDetails.length === 0 ? (
            <div className={classes.preloader}>
              {/* <CircularProgress /> */}
              <Card style={{width: '100%'}}>
                <CardContent>
                  <Skeleton animation="wave" variant="rect" width='100%' height={200} />
                  <Skeleton animation="wave" variant="text" height={40} />
                </CardContent>
              </Card>
            </div>
          ) : (
            allMealDetails.meals.map((meal) => {
              
              return (
                <Grid item xs={12} sm={12} md={12} key={meal.idMeal}>
                  <Card className={classes.marginBottom}>
                    <div className={classes.details}>
                    <CardContent>
                      <Typography variant="h3" gutterBottom>
                        {meal.strMeal}
                      </Typography>
                    </CardContent>
                    </div>
                    <CardMedia
                      className={classes.media}
                      image={meal.strMealThumb}
                      title={`${meal.strMeal} meal image`}
                    />
                  </Card>

                  <Grid container spacing={3}>

                    <Grid item xs={6} sm={6} md={6} lg={3}>
                      <Paper className={classes.padding}>
                        <Typography className={[classes.title, classes.flexCenter]} color="textSecondary" gutterBottom>
                          <FastfoodIcon /> Category
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {meal.strCategory}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} lg={3}>
                      <Paper className={classes.padding}>
                        <Typography className={[classes.title, classes.flexCenter]} color="textSecondary" gutterBottom>
                          <PublicIcon /> Region
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {meal.strArea}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} lg={3}>
                      <a href={meal.strYoutube} target="blank" className={classes.noTextStyle}>
                        <Paper className={[classes.padding, classes.btnYoutube]}>
                          <Typography className={[classes.txtBtnYoutube, classes.flexCenter]} color="white" gutterBottom>
                            <YouTubeIcon /> See on Youtube 
                          </Typography>
                        </Paper>
                      </a>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} lg={3}>
                      <a href={meal.strSource} target="blank" className={classes.noTextStyle}>
                        <Paper className={[classes.padding, classes.btnSource]}>
                          <Typography className={[classes.txtBtnSource, classes.flexCenter]} color="textSecondary" gutterBottom>
                            <LinkIcon /> Read on Source
                          </Typography>
                        </Paper>
                      </a>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Paper className={classes.padding}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                        Description:
                        </Typography>

                        <Typography gutterBottom variant="body1" component="p">
                          {meal.strInstructions}
                        </Typography>

                        <Typography variant="h6" color="textSecondary" gutterBottom>
                          Ingredients:
                        </Typography>
                        <div className={classes.ingredientsColumns}>
                          {allIngredients.map(item => {
                            return (<div className={classes.ingredientBox}><img className={classes.ingredientBoxImage} src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`} alt="Ingredient"/><Typography className={classes.ingredientBoxName} variant="body1" component="p">{`${item.ingredient}: ${item.measure}`}</Typography></div>);
                          })}
                        </div>

                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          {meal.strTags && `Tags: ${meal.strTags}`}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </div>
  );
}
