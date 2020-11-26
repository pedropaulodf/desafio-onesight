import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import urlTheMealDB from "../utils/Utils";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, CircularProgress, Container, Paper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';

import { useTable } from "react-table";
import { COLUMNS } from "../components/tableColumns";
/*
  Categorias de alimentos
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

export default function MealCategories() {
  const classes = useStyles();
  const history = useHistory();
  const [allMealsCategories, setAllMealsCategories] = useState([]);

  useEffect(() => {
    const getMealCategories = async () => {
      const data = await api
        .get(`${urlTheMealDB}/categories.php`)
        .then((response) => {
          return response.data;
        });

      console.log(data);
      setAllMealsCategories(data);
    };

    getMealCategories();
  }, []);

  // function Table() {
  //   const columns = useMemo(() => COLUMNS, []);
  //   const data = useMemo(() => allMealsCategories.categories, []);

  //   const {
  //     getTableProps,
  //     getTableBodyProps,
  //     headerGroups,
  //     rows,
  //     prepareRow,
  //   } = useTable({
  //     columns,
  //     data,
  //   });

  //   return (
  //     <table {...getTableProps()}>
  //       <thead>
  //         {
  //           headerGroups.map((headerGroup) => {
  //             <tr {...headerGroup.getHeaderGroupProps()}>
  //               {
  //                 headerGroup.headers.map((column) => {
  //                   <th {...column.getHeaderProps}>
  //                     {column.render('Header')}
  //                   </th>
  //                 })
  //               }
  //             </tr>
  //           })
  //         }
  //       </thead>
  //       <tbody {...getTableBodyProps()}>
  //         {
  //           rows.map(row => {
  //             prepareRow(row);
  //             return (
  //               <tr {...row.getRowProps()}>
  //                 {
  //                   row.cells.map((cell, index) => {
  //                     if (index === 0) {
  //                       return (
  //                         <td>
  //                           <img src={cell.row.cells[index].value} alt="Category" width="50" />
  //                         </td>
  //                       )
  //                     }else {
  //                       return <td>{cell.row.cells[index].value}</td>;
  //                     }
  //                     // {return <td {...cell.getCellProps()}>
  //                     //   {cell.render('Cell')}
  //                     // </td>}
  //                   })
  //                 }
  //               </tr>
  //             )
  //           })
  //         }
  //       </tbody>
  //     </table>
  //   );
  // }

  function handleClickGoToCategoryMeals(idCategory) {
    history.push(`/list/${idCategory}`);
  }

  return (
    <div>
      <Header></Header>
      <Container maxWidth="md">
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h3" gutterBottom>
          Meal Categories
          </Typography>
        </Paper>
        
        <Grid container spacing={3}>
          {allMealsCategories.length === 0 
          ? <div className={classes.preloader}>
              <CircularProgress /> 
            </div>
          : (
            // <Table />
            allMealsCategories.categories.map((category) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={category.idCategory}>
                  <Card>
                    <CardActionArea
                      onClick={() =>
                        handleClickGoToCategoryMeals(category.strCategory)
                      }
                    >
                      <CardMedia
                        className={classes.media}
                        image={category.strCategoryThumb}
                        title={`${category.strCategory} category image`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {category.strCategory}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {category.strCategoryDescription}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          handleClickGoToCategoryMeals(category.strCategory)
                        }
                      >
                        See meals of this category
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
