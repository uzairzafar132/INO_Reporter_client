import * as React from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText, Box } from '@mui/material';
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import axios from "axios";
import styles from "./styles.module.css";






export default function AddItem() {

    const [area, setArea] = useState("");
    const [date, setDate] = useState("");
    const [materialUnit, setMaterialUnit] = useState("");
    const [numberOfCode, setNumberOfCode] = useState("");

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
       console.log(formData)
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

    const handleCancel = () => {
      setArea("");
      setDate("");
      setMaterialUnit("");
      setNumberOfCode("");
    };


  
 
  return (
    <div>
      
    </div>
  );
}