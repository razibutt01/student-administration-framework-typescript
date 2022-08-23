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
} from "UiComponents";
import type { TableProps, tableStudentProps } from "components/ComponentTypes";
import { params } from "components/UrlParam";
import { fetchWrapper, _updateData } from "Utils/FetchWrapper";
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
    "& > th": {
      fontWeight: "bold",
    },
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
  getEditStudent,
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

  const handleDelete = async (id: number) => {
    await fetchWrapper({
      method: "DELETE",
      url: `${params}/` + id,
    });

    _updateData(params, setTableStu);
  };
  const handleStudent = (student: tableStudentProps) => {
    handleClickOpens();
    getEditStudent(student);
  };
  return (
    <div className="Table">
      <TableContainer component={Paper} className={classes.Container}>
        <Table aria-label="simple table" stickyHeader className={classes.table}>
          <TableHead>
            <TableRow className={classes.td}>
              <TableCell>Name</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Place of Birth</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Groups</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableStu.length > 0
              ? tableStu
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow key={student.id} className={classes.td}>
                      <TableCell onClick={() => handleStudent(student)}>
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
