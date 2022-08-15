import React from "react";
import { makeStyles, FormControlLabel, TextField, Box } from "../UiComponents";
import type { SideProps } from "./ComponentTypes";
const UseStyles = makeStyles({
  side: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    maxWidth: "250px",
    "@media screen and (max-width:940px)": {
      maxWidth: "150px",
    },
    "@media screen and (max-width:845px)": {
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #dddddd",
      maxWidth: "845px",
    },
    "@media screen and (max-width:470px)": {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },
  label: {
    margin: "4px 50px",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: "5px",
    "@media screen and (max-width:900px)": {
      maxWidth: "150px",
      alignItems: "center",
    },
    "@media screen and (max-width:845px)": {
      margin: "10px auto",
    },
    "@media screen and (max-width:470px)": {
      maxWidth: "470px",
    },
  },
});
const SideBar = ({ getFilter }: SideProps) => {
  const classes = UseStyles();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    getFilter(e.target.value);
  };
  const FieldArr = [
    {
      label: "Chemistry",
      value: "Chemistry",
    },
    {
      label: "Physics",
      value: "Physics",
    },
    {
      label: "Maths",
      value: "Maths",
    },
    {
      label: "Computer",
      value: "Computer",
    },
    {
      label: "Biology",
      value: "Biology",
    },
  ];
  return (
    <Box className={classes.side}>
      {FieldArr.map((fields) => (
        <FormControlLabel
          label={fields.label}
          className={classes.label}
          control={
            <TextField
              type="checkbox"
              value={fields.value}
              variant="filled"
              onChange={(e) => handleChange(e)}
            />
          }
        />
      ))}
    </Box>
  );
};

export default SideBar;
