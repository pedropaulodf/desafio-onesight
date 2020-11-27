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
    height: 400,
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
  }
}));

export default function MealDetails() {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();

  const [allMealDetails, setAllMealDetails] = useState([]);

  useEffect(() => {
    console.log(match.params.id);
    const mealId = match.params.id;

    const getAllMealsDetails = async () => {
      const data = await api
        .get(`${urlTheMealDB}/lookup.php?i=${mealId}`)
        .then((response) => {
          return response.data;
        });
      console.log(data);
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
        <Button size="large" color="primary" onClick={handleGoBackButtonClick}>
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
                      title={`${meal.strMeal} category image`}
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
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          Recipe Description
                        </Typography>

                        <Typography gutterBottom variant="body1" component="p">
                          {meal.strInstructions}
                        </Typography>

                        <Typography variant="h6" color="textSecondary" gutterBottom>
                          Recipe Ingredients:
                        </Typography>

                        {meal.strIngredient1 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient1}: ${meal.strMeasure1}`}
                        </Typography>}
                        
                        {meal.strIngredient2 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient2}: ${meal.strMeasure2}`}
                        </Typography>}

                        {meal.strIngredient3 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient3}: ${meal.strMeasure3}`}
                        </Typography>}

                        {meal.strIngredient4 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient4}: ${meal.strMeasure4}`}
                        </Typography>}

                        {meal.strIngredient5 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient5}: ${meal.strMeasure5}`}
                        </Typography>}

                        {meal.strIngredient6 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient6}: ${meal.strMeasure6}`}
                        </Typography>}

                        {meal.strIngredient7 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient7}: ${meal.strMeasure7}`}
                        </Typography>}

                        {meal.strIngredient8 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient8}: ${meal.strMeasure8}`}
                        </Typography>}

                        {meal.strIngredient9 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient9}: ${meal.strMeasure9}`}
                        </Typography>}

                        {meal.strIngredient10 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient10}: ${meal.strMeasure10}`}
                        </Typography>}

                        {meal.strIngredient11 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient11}: ${meal.strMeasure11}`}
                        </Typography>}

                        {meal.strIngredient12 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient12}: ${meal.strMeasure12}`}
                        </Typography>}

                        {meal.strIngredient13 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient13}: ${meal.strMeasure13}`}
                        </Typography>}

                        {meal.strIngredient14 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient14}: ${meal.strMeasure14}`}
                        </Typography>}

                        {meal.strIngredient15 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient15}: ${meal.strMeasure15}`}
                        </Typography>}

                        {meal.strIngredient16 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient16}: ${meal.strMeasure16}`}
                        </Typography>}

                        {meal.strIngredient17 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient17}: ${meal.strMeasure17}`}
                        </Typography>}

                        {meal.strIngredient18 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient18}: ${meal.strMeasure18}`}
                        </Typography>}

                        {meal.strIngredient19 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient19}: ${meal.strMeasure19}`}
                        </Typography>}

                        {meal.strIngredient20 && <Typography gutterBottom variant="body1" component="li">
                          {`${meal.strIngredient20}: ${meal.strMeasure20}`}
                        </Typography>}


                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          Tags: {meal.strTags}
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
