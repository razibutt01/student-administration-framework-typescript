import React from "react";
export type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  name: "name" | "placeOfBirth" | "dateOfBirth" | "sex" | "groups";
};
export type Student = {
  name: string;
  sex: string;
  dateOfBirth: string;
  placeOfBirth: string;
  groups: string[];
  id: number;
};
export type BodyType = {
  handleClickOpens: () => void;
  getEditStudent: (student: Student) => void;
  handleEditStudent2: () => void;
};
export type SideProps = {
  getFilter(e: string): void;
};
export type tableStudentProps = {
  name: string;
  sex: string;
  dateOfBirth: string;
  placeOfBirth: string;
  groups: string[];
  id: number;
};
export type TableProps = {
  tableStu: tableStudentProps[];
  setTableStu(e: tableStudentProps[]): void;
  handleClickOpens: () => void;
  getEditStudent: (student: tableStudentProps) => void;
};
export type TopStudentProps = {
  name: string;
  sex: string;
  dateOfBirth: string;
  placeOfBirth: string;
  groups: string[];
  id: number;
};
export type TopProps = {
  term: string;
  searchKeyword(e: string): void;
  topStudents: TopStudentProps[];
  handleClickOpen: () => void;
  handleEditStudent2: () => void;
};
export type CreateStudentProps = {
  name: string;
  sex: string;
  dateOfBirth: string;
  placeOfBirth: string;
  groups: string[];
  id: number;
};
export type CreateProps = {
  createStu: CreateStudentProps[];
  setCreateStu: React.Dispatch<React.SetStateAction<Student[]>>;
  editStudent: CreateStudentProps;
};
export type fetchWrapperprop = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  header?: string;
  body?: Student;
  url: string;
};
