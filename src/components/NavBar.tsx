import React from "react";
import {
  makeStyles,
  Box,
  TextField,
  Button,
  EditIcon,
  PersonIcon,
} from "UiComponents";
import type { TopProps } from "components/ComponentTypes";
import { Typography } from "@mui/material";
const UseStyles = makeStyles({
  Top: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyItems: "center",
    alignItems: "center",
    margin: 0,
    marginTop: "20px",
    boxSizing: "border-box",
    flexWrap: "wrap",
    "@media screen and (max-width:630px)": {
      flexWrap: "no-wrap",
    },
    "@media screen and (max-width:545px)": {
      flexDirection: "row",
    },
  },
  Students: {
    display: "flex",
    flexDirection: "row",
    marginRight: "20px",
    gap: "3px",
    "@media screen and (max-width:500px)": {
      gap: "1px",
    },
    "@media screen and (max-width:480px)": {
      maxWidth: "480px",
      margin: "10px auto",
    },
  },
  h5: {
    marginRight: "15px",
    alignSelf: "center",
  },
  Search: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    flexGrow: 1,
    "@media screen and (max-width:545px)": {
      flexGrow: 0,
      flexDirection: "row",
      width: "40%",
    },
    "@media screen and (max-width:480px)": {
      maxWidth: "480px",
      margin: "10px auto",
    },
  },
  input: {
    padding: "5px",
    margin: "0px 20px",
    width: "30%",
    "@media screen and (max-width:545px)": {
      width: "90%",
    },
    "@media screen and (max-width:480px)": {
      width: "100%",
    },
  },
  btn: {
    margin: "0",
    padding: "0",
    marginTop: "10px",
    marginBottom: "10px",

    paddingRight: "2px",
    paddingLeft: "2px",
  },
  personIcon: {
    fontSize: "24px ",
    padding: "1",
    alignSelf: "center",
  },
  editIcon: {
    fontSize: "12px",
    borderRight: "1px solid white",
    marginRight: "5px",
    paddingRight: "5px",
    paddingTop: "0",
    paddingBottom: "0",
  },
});
const NavBar = ({
  topStudents,
  term,
  searchKeyword,
  handleClickOpen,
  handleEditStudent2,
}: TopProps) => {
  const classes = UseStyles();
  const handleCHange = () => {
    handleClickOpen();
    handleEditStudent2();
  };
  return (
    <Box className={classes.Top}>
      <Box className={classes.Search}>
        <TextField
          type="text"
          label="Search"
          placeholder="Search..."
          className={classes.input}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target !== null) {
              searchKeyword(e.target.value);
            }
          }}
          value={term}
        />
      </Box>
      <Box className={classes.Students}>
        <PersonIcon className={classes.personIcon} />
        <Typography className={classes.h5} variant="h6">
          {Object.keys(topStudents).length} Students
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleCHange}
          className={classes.btn}
        >
          <EditIcon className={classes.editIcon} />
          New
        </Button>
      </Box>
    </Box>
  );
};
export default NavBar;
