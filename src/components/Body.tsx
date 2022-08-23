import React from "react";
import { makeStyles, Box, Container, Paper } from "UiComponents";
import type { Student } from "components/ComponentTypes";
import type { BodyType } from "components/ComponentTypes";
import useFetch from "CustomHook/useFetch";
import SideBar from "components/SideBar";
import Tables from "components/Tables";
import NavBar from "components/NavBar";
import { params } from "./UrlParam";
const UseStyles = makeStyles({
  Body: {
    border: "1px solid #dddddd",
    width: "100%",
    margin: "0",
    boxSizing: "border-box",
    maxWidth: "sm",
    minHeight: "560px",
    "@media screen and (max-width:940px)": {
      maxWidth: "940px",
    },
  },
  BodyContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    boxSizing: "border-box",
    margin: "0",
    marginTop: "70px",
    "@media screen and (max-width:940px)": {
      maxWidth: "940px",
    },
  },
  Side: {
    maxwidth: "250px",
    marginTop: "50px",
    "@media screen and (max-width:845px)": {
      maxWidth: "845px",
      marginTop: "0",
      margin: "10px auto",
    },
  },
  Table: {
    boxSizing: "border-box",
    maxWidth: "750px",
    display: "inline-block",
    width: "100%",
    margin: "0px auto",
    "@media screen and (max-width:1100px)": {
      maxWidth: "650px",
    },
    "@media screen and (max-width:990px)": {
      maxWidth: "600px",
    },
    "@media screen and (max-width:900px)": {
      maxWidth: "550px",
    },
    "@media screen and (max-width:845px)": {
      maxWidth: "845px",
    },
  },
});
const Body = ({
  handleClickOpens,
  getEditStudent,
  handleEditStudent2,
}: BodyType) => {
  const { data, isPending, error } = useFetch(params);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setResults] = React.useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = React.useState<Student[]>([]);
  const [GroupArr, setGroupArr] = React.useState<string[]>([]);
  const classes = UseStyles();
  const searchHandler = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newStudent = students.filter((student) => {
        return Object.values(student.name)
          .join("")
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
      setResults(newStudent);
    } else {
      setResults(students);
    }
  };
  React.useEffect(() => {
    const newFilteredStudents = students.filter((student) =>
      student.groups.find((group) => {
        if (GroupArr.includes(group)) {
          return true;
        }
        return false;
      })
    );
    setFilteredStudents(newFilteredStudents);
  }, [GroupArr]);
  const handleFilter = (value: string) => {
    const current = GroupArr.indexOf(value);
    const newValue = [...GroupArr];
    if (current === -1) {
      newValue.push(value);
    } else {
      newValue.splice(current, 1);
    }
    setGroupArr(newValue);
  };

  React.useEffect(() => {
    if (data?.length) {
      setStudents(data);
    }
  }, [data]);
  return (
    <Container className={classes.Body} component={Paper} maxWidth="lg">
      <Box className="top">
        {students && (
          <NavBar
            topStudents={students}
            term={searchTerm}
            searchKeyword={searchHandler}
            handleClickOpen={handleClickOpens}
            handleEditStudent2={handleEditStudent2}
          />
        )}
      </Box>
      <Box className={classes.BodyContent}>
        <Box className={classes.Side}>
          {error && <Box>{error}</Box>}
          {isPending && <Box>Loading...</Box>}
          {students && <SideBar getFilter={(e: string) => handleFilter(e)} />}
        </Box>
        <Box className={classes.Table}>
          {error && <Box>{error}</Box>}
          {isPending && <Box>Loading...</Box>}
          {students && (
            <Tables
              tableStu={
                GroupArr.length > 0
                  ? filteredStudents
                  : searchTerm.length < 1
                  ? students
                  : searchResults
              }
              setTableStu={setStudents}
              getEditStudent={getEditStudent}
              handleClickOpens={handleClickOpens}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Body;
