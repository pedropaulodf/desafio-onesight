import Header from "../components/Header";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import {urlTheMealDB} from "../utils/Utils";
import { Skeleton } from "@material-ui/lab";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, makeStyles, Paper, TableContainer, Typography } from "@material-ui/core";

import { useTable } from "react-table";
import { TABLE_MEALS_LIST_COLUMNS } from "../components/tablesColumns";
import { useSelector } from "react-redux";

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

/*
  Tabela com foto, nome, categoria e link para vídeo da receita
*/
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // marginBottom: 20
  },
  cardFlex: {
    display: "flex",
    marginBottom: "20px",
  },
  media: {
    height: 200,
  },
  categoryImage: {
    width: "50%",
    minWidth: '100px',
    backgroundSize: "cover",
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0px 0px 0px",
    marginBottom: "20px",
  },
  preloader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  tableCategoryImage: {
    borderRadius: '7px',
  }
}));

export default function MealsList() {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const tableMode = useSelector((state) => {
    return state.table_mode;
  });
  
  const [allMealsByCategory, setAllMealsByCategory] = useState([]);

  useEffect(() => {
    const idCategory = match.params.id;

    const getAllMealsByCategory = async () => {
      const data = await api.get(`${urlTheMealDB}/filter.php?c=${idCategory}`)
        .then((response) => {
          return response.data;
        });
      console.log(data);
      
      const newData = data.meals.map(meal => {
        return {...meal, 'mealLink': `${meal.idMeal}`};
      })
      setAllMealsByCategory(newData);

      // setAllMealsByCategory(data);
    };

    getAllMealsByCategory();
  }, []);

  function handleClickGoToMealsCategoryList(idCategory) {
    history.push(`/details/${idCategory}`);
  }

  function handleGoBackButtonClick() {
    history.goBack();
  }

  function Table() {
    const columns = useMemo(() => TABLE_MEALS_LIST_COLUMNS, []);
    const data = useMemo(() => allMealsByCategory, []);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    });

    return (
      <div>
          <TableContainer component={Paper}>
          <MaUTable {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup, index) => {
                <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map((column, index) => {
                      <TableCell key={index} {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </TableCell>
                    })
                  }
                </TableRow>
              })}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {
                rows.map(row => {
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps()} >
                      {
                        row.cells.map((cell, index) => {
                          if (index === 0) {
                            return (
                              <TableCell key={index}>
                                <img src={cell.row.cells[index].value} alt="Category" width="100px" className={classes.tableCategoryImage} />
                              </TableCell>
                            )
                          }else if(index === 2) {
                            return (
                              <TableCell key={index}>
                                  <Button 
                                  fullWidth
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleClickGoToMealsCategoryList(cell.row.cells[index].value)
                                  }>See this recipe</Button>
                              </TableCell>
                            )
                          } else {
                            return (
                              <TableCell key={index}>
                                <Typography gutterBottom variant="h5" component="h5">
                                  {cell.row.cells[index].value}
                                </Typography>
                              </TableCell>);
                          }
                        })
                      }
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </MaUTable>
        </TableContainer>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <Container maxWidth="md">
        <Card className={classes.cardFlex}>
          <CardMedia
            xs={12} sm={6} md={4}
            className={classes.categoryImage}
            image={location.state.thumb}
            title={`${match.params.id} category image`}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h4" component="h4">
                Category {match.params.id}
              </Typography>
              {/* <Typography gutterBottom variant="body1" component="p">
                {location.state.description}
              </Typography> */}
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={handleGoBackButtonClick}>
                See all categories
              </Button>
            </CardActions>
          </div>
        </Card>

        <Grid container spacing={3}>
          {allMealsByCategory.length === 0 
          ? (
            <div className={classes.preloader}>
              {/* <CircularProgress /> */}
              <Card style={{width: '100%'}}>
                <CardContent>
                  <Skeleton animation="wave" variant="rect" width='100%' height={200} />
                  <Skeleton animation="wave" variant="text" height={40} />
                </CardContent>
              </Card>
            </div>
          ) 
          : tableMode ? 
            <Grid item xs={12} sm={12} md={12}>
              <Table />
            </Grid>
            : (
            allMealsByCategory.map((meal) => {
              return (
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
                        fullWidth
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          handleClickGoToMealsCategoryList(meal.idMeal)
                        }
                      >
                        See recipe
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>
    </div>
  );
}
