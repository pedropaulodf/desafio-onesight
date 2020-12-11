import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import {urlTheMealDB} from "../utils/Utils";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Container, Modal, Paper, TableContainer } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import transitions from "@material-ui/core/styles/transitions";

import { useTable } from "react-table";
import { TABLE_MEALS_CATEGORIES_COLUMNS } from "../utils/tablesColumns";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";

import '../styles/tablesStyles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // marginBottom: 20
  },
  media: {
    height: 200,
    backgroundSize: "contain",
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
    width: '100%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: '15px',
    marginBottom: '20px', 
  },
  tableCategoryImage: {
    borderRadius: '7px',
  },
  mainContent: {
    display: 'box',
    lineClamp: 3,
    boxOrient: 'vertical',  
    overflow: 'hidden',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },
  modalStyle: {
    position: 'absolute',
    width: '70%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    borderRadius: '5px 5px 5px 5px',
    fontFamily: 'Roboto, sans-serif',
  },
  modalImg: {
    borderRadius: '7px',
    marginTop: '14px',
    width: '100%',
  }
}));

export default function MealCategories() {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  
  const [allMealsCategories, setAllMealsCategories] = useState([]);
  // const [tableMode, setTableMode] = useState(false);

  const tableMode = useSelector((state) => {
    return state.table_mode;
  });

  useEffect(() => {
    const getMealCategories = async () => {
      const data = await api.get(`${urlTheMealDB}/categories.php`)
        .then((response) => {
          return response.data;
        });

      const newData = data.categories.map(category => {
        return {...category, 'categoryLink': `${category.strCategory}`};
      })
      setAllMealsCategories(newData);
    };

    getMealCategories();
  }, []);
  
  const handleModalOpen = (catName, catDescription, catThumb) => {
    setModalContent(
      <div className={classes.modalStyle}>
        <img src={catThumb} alt={`${catName}`} className={classes.modalImg}/>
        <h2 id="simple-modal-title">{catName}</h2>
        <p id="simple-modal-description">
          {catDescription}
        </p>
        <Button size="small" variant="outlined" onClick={handleModalClose}>close</Button>
      </div>
    );
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  function Table() {
    const columns = useMemo(() => TABLE_MEALS_CATEGORIES_COLUMNS, []);
    const data = useMemo(() => allMealsCategories, []);

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
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
          {
            rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} >
                  {
                    row.cells.map((cell, index) => {
                      if (index === 0) {
                        return (
                          <td key={index} data-label="Image">
                            <img src={cell.row.cells[index].value} alt="Category"  className="" />
                          </td>
                        )
                      } else if(index === 1) {
                        return (
                          <td key={index} data-label="Category">
                            {cell.row.cells[index].value}
                          </td>);
                      } else if(index === 2) {
                        return (
                          <td key={index} data-label="Info">
                            {cell.row.cells[index].value}
                          </td>);
                      } else if(index === 3) {
                        return (
                          <td key={index} data-label="Link">
                              <Button 
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={() => handleClickGoToCategoryMeals(cell.row.cells[index-2].value, cell.row.cells[index-2].value, cell.row.cells[index-3].value)
                              }>See {cell.row.cells[index].value} meals</Button>
                          </td>
                        )
                      }
                    })
                  }
                </tr>
              )
            })
          }
          </tbody>
        </table>

        {/* <TableContainer component={Paper}>
          <MaUTable {...getTableProps()}>
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {
                rows.map(row => {
                  prepareRow(row);
                  console.log(row)
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
                          }else if(index === 3) {
                            return (
                              <TableCell key={index}>
                                  <Button 
                                  fullWidth
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleClickGoToCategoryMeals(cell.row.cells[index-2].value, cell.row.cells[index-2].value, cell.row.cells[index-3].value)
                                  }>See {cell.row.cells[index].value} meals</Button>
                              </TableCell>
                            )
                          } else {
                            return (
                              <TableCell key={index}>
                                {cell.row.cells[index].value}
                              </TableCell>);
                          }
                          // {return <td {...cell.getCellProps()}>
                          //   {cell.render('Cell')}
                          // </td>}
                        })
                      }
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </MaUTable>
        </TableContainer> */}
        
      </div>
    );
  }

  function handleClickGoToCategoryMeals(idCategory, categoryDescription, categoryThumb) {
    history.push({pathname: `/list/${idCategory}`, state: {description: categoryDescription, thumb: categoryThumb}});
  }

  return (
    <div>
      <Header></Header>
      <Container maxWidth="lg">

        <Grid container spacing={3} className={classes.container}>
          {allMealsCategories.length === 0 
          ? <div className={classes.preloader}>
              {/* <CircularProgress /> */}
              <Card style={{width: '100%'}}>
                <CardContent>
                  <Skeleton animation="wave" variant="rect" width="100%" height={200} />
                  <Skeleton animation="wave" variant="text" height={40} />
                </CardContent>
              </Card>
            </div>
          : (
            tableMode ? <Table />
            : (
              allMealsCategories.map((category) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} direction='column' key={category.idCategory}>
                    <Card>
                      <CardActionArea
                        onClick={() =>
                          handleClickGoToCategoryMeals(category.strCategory, category.strCategoryDescription, category.strCategoryThumb)
                        }
                      >
                        <CardMedia
                          className={classes.media}
                          image={category.strCategoryThumb}
                          title={`${category.strCategory} category image`}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h4" component="h4" className={classes.center}>
                            {category.strCategory}
                          </Typography>
                          <Typography gutterBottom variant="body1" component="body1" className={[classes.center, classes.mainContent]} >
                            {category.strCategoryDescription}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="small"
                          // color="primary"
                          variant="outlined"
                          fullWidth
                          onClick={() => {handleModalOpen(category.strCategory, category.strCategoryDescription, category.strCategoryThumb)}}
                        >
                          Description
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          fullWidth
                          onClick={() =>
                            handleClickGoToCategoryMeals(category.strCategory, category.strCategoryDescription, category.strCategoryThumb)
                          }
                        >
                          See meals
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            )
          )}
        </Grid>

        <Modal
          className={classes.modal}
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {modalContent}
        </Modal>

      </Container>
    </div>
  );
}
