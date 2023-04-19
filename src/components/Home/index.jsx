import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Navbar from "../Navbar";
import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";

import { FormControl, TextField } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import styles from "./styles.module.css";


function Home() {
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [materialUnit, setMaterialUnit] = useState("");
  const [numberOfCode, setNumberOfCode] = useState("");
  const [items, setItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleMaterialUnitChange = (event) => {
    setMaterialUnit(event.target.value);
  };

  const handleNumberOfCodeChange = (event) => {
    setNumberOfCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { area, date, materialUnit, numberOfCode };
    console.log(formData);
    axios
      .post("http://localhost:8080/api/usersdata", formData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
    setArea("");
    setDate("");
    setMaterialUnit("");
    setNumberOfCode("");
    window.location = "/";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usersdata")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  //  useEffect(() => {
  //    axios
  //      .get("http://localhost:8080/api/users")
  //      .then((res) => setUsers(res.data))
  //      .catch((err) => console.log(err));
  //  }, []);

  console.log(items);
  console.log(checkedItems);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setCheckedItems(event.target.checked ? items : []);
  };

  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem._id !== item._id)
      );
    }
  };

  const handleDelete = (index) => {
    console.log(index._id);
    const id = index._id;

    axios
      .delete(`http://localhost:8080/api/usersdata/${id}`)
      .then((response) => {
        console.log(response.data);
         window.location = "/";
        // Handle successful response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };

  const openDialog = (item) => {
    setItems(item);
    setOpen2(true);
  };



  const handleEdit = (index) => {
    console.log(index._id);
    const formData = { area, date, materialUnit, numberOfCode };
    const id = index._id;

    axios
      .put(`http://localhost:8080/api/usersdata/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        // Handle successful response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });

    setArea("");
    setDate("");
    setMaterialUnit("");
    setNumberOfCode("");
    window.location = "/";
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          {" "}
          <Navbar />
        </Grid>

        <Grid item xs={12} style={{ backgroundColor: "midnightblue" }}>
          <IconButton
            style={{ margin: "10px" }}
            aria-label="ControlPointOutlined"
            sx={{ color: "white" }}
          >
            <SearchIcon />
          </IconButton>
          <div
            style={{
              alignContent: "center",
              margin: "15px",
              float: "right",
              display: "flex",
            }}
          >
            <span style={{ marginRight: "80px" }} sx={{ color: "white" }}>
              <Pagination count={3} />
            </span>
            <span
              style={{
                backgroundColor: "#ac08af",
                padding: "25px",
                position: "absolute",
                right: "0px",
                marginTop: "5px",
              }}
            >
              <IconButton
                onClick={handleClickOpen}
                aria-label="ControlPointOutlined"
                sx={{ color: "white" }}
              >
                <ControlPointIcon />
              </IconButton>
            </span>
          </div>
        </Grid>
      </Grid>
      {/* // */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form className={styles.abc} onSubmit={handleSubmit}>
          <Grid container className={styles.contain}>
            <Grid style={{ width: "400px" }} item xs={4}>
              <Typography
                style={{
                  paddingLeft: "40px",
                  paddingTop: "40px",
                  fontSize: "23px",
                }}
                variant="h5"
                color="white"
                alignContent="center"
              >
                Add a new Item
              </Typography>

              <span
                style={{
                  position: "relative",
                  top: "170px",
                  left: "30px",

                  margin: "3px",
                }}
              >
                <Button
                  style={{ margin: "5px" }}
                  type="submit"
                  variant="contained"
                  onClick={handleClose}
                >
                  close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </span>
            </Grid>
            <Grid item xs={8}>
              <Box
                className={styles.formcontrol}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormControl sx={{ m: 1 }}>
                  <TextField
                    className={styles.text}
                    value={area}
                    onChange={handleAreaChange}
                    fullWidth
                    id="fullWidth"
                    margin="dense"
                    name="area"
                    label="Area"
                    style={{ backgroundColor: "white" }}
                  />
                  <TextField
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    style={{ backgroundColor: "white" }}
                    name="date"
                    id="margin-dense"
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    type="text"
                    value={materialUnit}
                    onChange={handleMaterialUnitChange}
                    style={{ backgroundColor: "white" }}
                    id="margin-dense"
                    margin="dense"
                    name="materialcode"
                    variant="outlined"
                    label="Material Code"
                  />
                  <TextField
                    type="number"
                    id="margin-dense"
                    margin="dense"
                    value={numberOfCode}
                    onChange={handleNumberOfCodeChange}
                    style={{ backgroundColor: "white" }}
                    name="numberofunits"
                    variant="outlined"
                    label="Number of Units"
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Dialog>

      {/*  */}
      <Grid item xs={6}></Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
            </TableCell>
            <TableCell>
              <Typography>
                <b> Area </b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                <b> Date </b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                <b> Number of Units</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                <b> Number Of Codes </b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                <b> Actions </b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(items) &&
            items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Checkbox
                    checked={checkedItems.some(
                      (checkedItem) => checkedItem._id === item._id
                    )}
                    onChange={(event) => handleCheckboxChange(event, item)}
                  />
                </TableCell>

                <TableCell>{item.area}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.numberOfCode}</TableCell>
                <TableCell>{item.numberOfUnits}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => openDialog(item)}
                    aria-label="ControlPointOutlined"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(item)}
                    aria-label="ControlPointOutlined"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/*  */}

      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form className={styles.abc}>
          <Grid container className={styles.contain}>
            <Grid style={{ width: "400px" }} item xs={4}>
              <Typography
                style={{
                  paddingLeft: "50px",
                  paddingTop: "40px",
                  fontSize: "23px",
                }}
                variant="h5"
                color="white"
                alignContent="center"
              >
                Update Item
              </Typography>

              <span
                style={{
                  position: "relative",
                  top: "170px",
                  left: "30px",

                  margin: "3px",
                }}
              >
                <Button
                  style={{ margin: "5px" }}
                  type="submit"
                  variant="contained"
                  onClick={handleClose}
                >
                  close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => handleEdit(items)}
                >
                  Update
                </Button>
              </span>
            </Grid>
            <Grid item xs={8}>
              <Box
                className={styles.formcontrol}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormControl sx={{ m: 1 }}>
                  <TextField
                    className={styles.text}
                    value={area}
                    onChange={handleAreaChange}
                    fullWidth
                    id="fullWidth"
                    margin="dense"
                    name="area"
                    label="Area"
                    style={{ backgroundColor: "white" }}
                  />
                  <TextField
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    style={{ backgroundColor: "white" }}
                    name="date"
                    id="margin-dense"
                    margin="dense"
                    variant="outlined"
                  />
                  <TextField
                    type="text"
                    value={materialUnit}
                    onChange={handleMaterialUnitChange}
                    style={{ backgroundColor: "white" }}
                    id="margin-dense"
                    margin="dense"
                    name="materialcode"
                    variant="outlined"
                    label="Material Code"
                  />
                  <TextField
                    type="number"
                    id="margin-dense"
                    margin="dense"
                    value={numberOfCode}
                    onChange={handleNumberOfCodeChange}
                    style={{ backgroundColor: "white" }}
                    name="numberofunits"
                    variant="outlined"
                    label="Number of Units"
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Dialog>

      {/*  */}
    </div>
  );
}

export default Home;
