import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles, Container, Typography } from "./UiComponents";
import type { Student } from "./components/ComponentTypes";
import "./App.css";
import useFetch from "./CustomHook/useFetch";
import Body from "./components/Body";
import CustomizedDialogs from "./components/CustomizedDialogs";
import Create from "./AddEditForm/Create";
import { params } from "./components/UrlParam";
export interface Dialogtype {
  handleClickOpens: () => void;
}
const UseStyles = makeStyles({
  App: {
    textAlign: "center",
    margin: "100px auto",
  },
});
function App() {
  const classes = UseStyles();
  const { data, isPending, error } = useFetch(params);
  const [appstudents, setAppStudents] = React.useState<Student[]>([]);
  const [id, getId] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (data?.length) {
      setAppStudents(data);
    }
  }, [data]);
  const initialState: Dialogtype = {
    handleClickOpens: () => {},
  };
  const AppContent = React.createContext<Dialogtype>(initialState);
  const handleClickOpens = () => {
    setOpen(true);
  };
  const handleID = () => {
    getId(0);
  };
  const handleId = (id: number) => {
    getId(id);
  };
  return (
    <AppContent.Provider value={{ handleClickOpens }}>
      <Router>
        <Container className={classes.App}>
          <Switch>
            <Container>
              <Typography variant="h4">
                Student Administration Framework
              </Typography>

              <Route exact path="/">
                <Body
                  handleClickOpens={handleClickOpens}
                  getId={(id: number) => handleId(id)}
                  handleID={handleID}
                />
              </Route>
              <Route>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {appstudents && (
                  <CustomizedDialogs
                    open={open}
                    setOpen={setOpen}
                    handleClickOpen={handleClickOpens}
                  >
                    <Create
                      id={id}
                      createStu={appstudents}
                      setCreateStu={setAppStudents}
                    />
                  </CustomizedDialogs>
                )}
              </Route>
            </Container>
          </Switch>
        </Container>
      </Router>
    </AppContent.Provider>
  );
}

export default App;
