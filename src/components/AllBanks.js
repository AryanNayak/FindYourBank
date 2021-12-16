import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@mui/material/TablePagination";
import { NavLink, Link } from "react-router-dom";
import {
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Form,
  ListGroup,
} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./loader.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = ["MUMBAI", "BANGALORE", "PUNE", "DELHI", "KOLKATA"];

const category = ["IFSC", "BRANCH", "BANK NAME"];

function getStyles(name, cityName, theme) {
  return {
    fontWeight:
      cityName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
  },
}));

export default function AllBanks() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const theme = useTheme();
  const [cityName, setcityName] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [currentCat, setCurrentCat] = useState();

  const [input, setInput] = useState("");

  const [axiosTimer, setAxiosTimer] = useState("");
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState(["loading"]);
  const [cat, setCat] = useState("");
  const handleOnClick = (e) => {
    setIsError(false);
    let startTime = Date.now();
    try {
      axios
        .get("https://vast-shore-74260.herokuapp.com/banks?city=" + e)
        .then((response) => {
          // console.log(response);
          setData(response.data);
          setFilteredData(response.data);
          axiosTimerFunc(startTime);
        });
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
  };

  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Data, please try again in a few minutes
        </div>
      );
    }
  };

  const axiosTimerFunc = (startTime) => {
    let now = Date.now();
    let seconds = Math.floor((now - startTime) / 1000);
    let milliseconds = Math.floor((now - startTime) % 1000);
    setAxiosTimer(`${seconds}.${milliseconds} seconds`);
  };

  const handleChangeDrop = (event) => {
    const {
      target: { value },
    } = event;
    setcityName(typeof value === "string" ? value.split(",") : value);
    setInput("");
    handleOnClick(event.target.value);
  };

  const handleChangeDropCategories = (event) => {
    const {
      target: { value },
    } = event;

    setCurrentCat(event.target.value);
    setCategories(typeof value === "string" ? value.split(",") : value);
    setInput("");
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInput = (e) => {
    e.persist();
    let searchItem = input.toUpperCase().trim();
    if (!searchItem.trim()) {
      setFilteredData(data);
    }

    const serachIn = (firstCategory) => {
      if (firstCategory.indexOf(searchItem) !== -1) {
        return true;
      }
      let fullCategory = firstCategory;
      if (fullCategory.indexOf(searchItem) !== -1) {
        return true;
      }
      return false;
    };

    const filteredData = data.filter((item) => {
      if (currentCat === "ifsc") {
        return serachIn(item.ifsc);
      }
      if (currentCat === "bank_name") {
        return serachIn(item.bank_name);
      }
      if (currentCat === "branch") {
        return serachIn(item.branch);
      }
    });
    setFilteredData(filteredData);
  };

  return (
    <div className={classes.root} style={{ background: "#F5F5F5" }}>
      {renderError}
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={cityName}
          onChange={handleChangeDrop}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>CITY</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>CITY</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, cityName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={categories}
          onChange={(e) => handleChangeDropCategories(e)}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>CATEGORIES</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Categories</em>
          </MenuItem>
          <MenuItem
            key="IFSC"
            value="ifsc"
            style={getStyles("IFSC", categories, theme)}
          >
            IFSC
          </MenuItem>
          <MenuItem
            key="BANK NAME"
            value="bank_name"
            style={getStyles("BANK NAME", categories, theme)}
          >
            BANK NAME
          </MenuItem>
          <MenuItem
            key="BRANCH"
            value="branch"
            style={getStyles("BRANCH", categories, theme)}
          >
            BRANCH
          </MenuItem>
        </Select>
      </FormControl>

      <TabPanel value={value} index={0}>
        <Row>
          <Col xs={7}>
            <TextField
              id="standard-full-width"
              label="Search Query"
              style={{ margin: 8, width: "1400px", color: "white" }}
              placeholder="Select category first"
              helperText="Welcome to FINDYOURBANK"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setInput(e.target.value.toUpperCase());
                handleInput(e);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Col>
        </Row>
        <Container className="container-loader">
          <Row>
            <Col style={{ textAlign: "left" }}>
              <p>
                {" "}
                <strong>Search Time: {axiosTimer}</strong>{" "}
              </p>
            </Col>
          </Row>

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Bank</strong>
                  </TableCell>
                  <TableCell align="middle">
                    <strong>IFSC</strong>
                  </TableCell>
                  <TableCell align="middle">
                    <strong>Branch</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Bank ID</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Address</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Details</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length !== 0 ? (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell align="middle">
                            {" "}
                            {row.bank_name}{" "}
                          </TableCell>
                          <TableCell align="middle"> {row.ifsc}</TableCell>
                          <TableCell align="middle"> {row.branch} </TableCell>
                          <TableCell align="middle"> {row.bank_id}</TableCell>
                          <TableCell align="middle"> {row.address}</TableCell>
                          <Link
                            to={`/bank-details/${row.bank_id}`}
                            state={{ from: row }}
                            exact
                          >
                            <TableCell align="middle">Details</TableCell>
                          </Link>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableCell align="middle"> NO DATA </TableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </TabPanel>

      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
