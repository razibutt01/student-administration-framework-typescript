import React from "react";
import * as yup from "yup";
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  FormControl,
  FormLabel,
  makeStyles,
} from "../UiComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CreateStudentProps } from "../components/ComponentTypes";
import type { CreateProps } from "../components/ComponentTypes";
import type { InputProps } from "../components/ComponentTypes";
import { params } from "../components/UrlParam";
import { fetchWrapper, _updateData } from "../Utils/FetchWrapper";

const UseStyles = makeStyles({
  create: {
    margin: 0,
    padding: 0,
  },
  box: {
    display: "flex",
    flexDirection: "column",

    width: "420px",

    marginBottom: "6px",
    "@media screen and (max-width:515px)": {
      width: "350px",
    },
    "@media screen and (max-width:445px)": {
      width: "300px",
    },
    "@media screen and (max-width:400px)": {
      width: "280px",
    },
    "@media screen and (max-width:366px)": {
      width: "200px",
    },
  },
  groupBox: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 100px",
  },
  radio: {
    margin: "10px 100px",
  },
  check: {
    gap: "5px",
  },
  btn: {
    margin: "10px auto",
    display: "flex",
  },
  form: {
    margin: "0",
    padding: "0",
  },
  invalidFeedback: {
    color: "red",
    fontSize: "small",
    marginTop: "0",
    textAlign: "center",
  },
  invalidFeedbackForSex: {
    color: "red",
    fontSize: "small",
    marginTop: "0",
    marginLeft: "50px",
  },
  SaveEditbtn: {
    marginRight: "5px",
  },
});
const Create = ({ createStu, setCreateStu, id }: CreateProps) => {
  const [students, setStudents] = React.useState<CreateStudentProps[]>([]);
  const [isPending, setPending] = React.useState<boolean>(false);
  const isAddMode = !id;
  const classes = UseStyles();
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "only alphabets | no special characters")
      .max(25, "Name could not be 25 characters long")
      .min(4, "Name must contain at least 4 characters")
      .required("Name is required"),
    placeOfBirth: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "only alphabets are allowed")
      .required("Place of Birth is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    sex: yup.string().nullable().required("Gender is required"),
    groups: yup
      .array()
      .nullable()
      .min(1, "minimum 1 field must be chosen ")
      .max(4, "maximum 4 fields can be chosen")
      .required("Groups are required"),
  });
  const { register, handleSubmit, reset, setValue, getValues, formState } =
    useForm<CreateStudentProps>({
      resolver: yupResolver(validationSchema),
    });
  const { errors } = formState;

  function onSubmit(data: CreateStudentProps) {
    return isAddMode ? createStudent(data) : updateStudent(data, id);
  }
  function updateStudent(data: CreateStudentProps, id: number) {
    fetchWrapper({ method: "PUT", body: data, url: `${params}/` + id }).then(
      () => {
        setCreateStu(
          createStu.map((student) => (student.id === id ? data : student))
        );

        _updateData(params, setCreateStu);
      }
    );
  }
  function createStudent(data: CreateStudentProps) {
    fetchWrapper({ method: "POST", body: data, url: `${params}` }).then(
      (data) => {
        setCreateStu((prev: CreateStudentProps[]) => [...prev, data]);
      }
    );
  }
  React.useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      fetch(`${params}/` + id)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const fields: Array<
            "name" | "placeOfBirth" | "dateOfBirth" | "sex" | "groups"
          > = ["name", "placeOfBirth", "dateOfBirth", "sex", "groups"];
          fields.forEach((field) => setValue(field, data[field]));
          setStudents(data);
        });
    }
  }, []);
  console.log("getValues", getValues());
  const TextInputArr: InputProps[] = [
    {
      label: "Name",
      type: "text",
      placeholder: "Enter the Name",
      id: "name",
      name: "name",
    },
    {
      label: "Place of Birth",
      type: "text",
      placeholder: "Enter the Country",
      id: "placeOfBirth",
      name: "placeOfBirth",
    },
    {
      label: "Date of Birth",
      type: "date",
      placeholder: "Enter your Date of Birth",
      id: "dateOfBirth",
      name: "dateOfBirth",
    },
  ];
  return (
    <Box className={classes.create}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <FormControl>
          {TextInputArr.map((input) => {
            console.log("input", input);
            return (
              <Box className={classes.box}>
                <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
                <TextField
                  fullWidth
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  error={!!errors[input.name]}
                  helperText={errors[input.name] && errors[input.name]?.message}
                  {...register(input.name)}
                  defaultValue={!isAddMode ? { getValues } : ""}
                />
              </Box>
            );
          })}
          <Box className="form-group">
            <FormLabel>Sex:</FormLabel>
            <Box className={classes.radio}>
              <Box className="form-check form-check-inline">
                <FormControlLabel
                  label="Male"
                  className={classes.check}
                  control={
                    <TextField
                      type="radio"
                      value="Male"
                      {...register("sex")}
                      defaultValue={!isAddMode ? { getValues } : ""}
                      variant="filled"
                    />
                  }
                />
              </Box>
              <Box className="form-check form-check-inline">
                <FormControlLabel
                  label="Female"
                  className={classes.check}
                  control={
                    <TextField
                      type="radio"
                      value="Female"
                      {...register("sex")}
                      defaultValue={!isAddMode ? { getValues } : ""}
                      variant="filled"
                    />
                  }
                />
              </Box>
              <Box className={classes.invalidFeedbackForSex}>
                {errors.sex?.message}
              </Box>
            </Box>
          </Box>
          <Box>
            <FormLabel>Groups:</FormLabel>
            <Box className={classes.groupBox}>
              <FormControlLabel
                label="Maths"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Maths"
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />
              <FormControlLabel
                label="Chemistry"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Chemistry"
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />
              <FormControlLabel
                label="Physics"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Physics"
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />
              <FormControlLabel
                label="Computer"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Computer"
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />
              <FormControlLabel
                label="Biology"
                className={classes.check}
                control={
                  <TextField
                    type="checkbox"
                    value="Biology"
                    {...register("groups")}
                    defaultValue={!isAddMode ? { getValues } : ""}
                    variant="filled"
                  />
                }
              />
            </Box>
            <Box className={classes.invalidFeedback}>
              {errors.groups?.message}
            </Box>
          </Box>
          <Box className={classes.btn}>
            <Box className={classes.SaveEditbtn}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                // sx={{ marginRight: "5px" }}
              >
                {isAddMode ? "Submit" : "Save"}
              </Button>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="reset"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Create;
