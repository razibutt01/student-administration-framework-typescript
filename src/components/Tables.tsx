import React from "react";
import {
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TablePagination,
  DeleteRoundedIcon,
  makeStyles,
  Box,
} from "../UiComponents";
import type { TableProps } from "./ComponentTypes";
import { params } from "./UrlParam";
import { fetchWrapper, _updateData } from "../Utils/FetchWrapper";
const UseStyles = makeStyles({
  table: {
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    maxWidth: "750px",
    width: "100%",
    display: "inline-block",
  },
  td: {
    borderBottom: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  },
  head: {
    fontWeight: "bold",
  },
  deleteIcon: {
    cursor: "pointer",
  },
  studentCell: {
    color: "blue",
    cursor: "pointer",
  },
  Container: {
    maxHeight: "300px",
    width: "100%",
  },
});
const Tables = ({
  tableStu,
  handleClickOpens,
  setTableStu,
  getId,
}: TableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = UseStyles();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: number) => {
    fetchWrapper({ method: "DELETE", url: `${params}/` + id }).then(() => {
      _updateData(params, setTableStu);
    });
  };
  const handleStudent = (id: number) => {
    handleClickOpens();
    getId(id);
  };
  return (
    <div className="Table">
      <TableContainer component={Paper} className={classes.Container}>
        <Table aria-label="simple table" stickyHeader className={classes.table}>
          <TableHead>
            <TableRow className={classes.td}>
              <TableCell className={classes.head}>Name</TableCell>
              <TableCell className={classes.head}>Sex</TableCell>
              <TableCell className={classes.head}>Place of Birth</TableCell>
              <TableCell className={classes.head}>Date of Birth</TableCell>
              <TableCell className={classes.head}>Groups</TableCell>
              <TableCell className={classes.head}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableStu.length > 0
              ? tableStu
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow key={student.id} className={classes.td}>
                      <TableCell onClick={() => handleStudent(student.id)}>
                        <Box className={classes.studentCell}>
                          {student.name}
                        </Box>
                      </TableCell>

                      <TableCell>{student.sex}</TableCell>
                      <TableCell>{student.placeOfBirth}</TableCell>
                      <TableCell>{student.dateOfBirth}</TableCell>
                      <TableCell>
                        {student.groups.map((group) => (
                          <p>{group}</p>
                        ))}
                      </TableCell>
                      <TableCell>
                        <DeleteRoundedIcon
                          className={classes.deleteIcon}
                          color="primary"
                          onClick={() => handleDelete(student.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              : "No such student is here"}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ margin: "0" }}
        component="div"
        count={tableStu.length}
        page={page}
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Tables;
