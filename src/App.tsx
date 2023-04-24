import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Auth from './components/Auth/Auth';
import Reg from './components/Reg/Reg';
import { useEffect } from 'react';
import Projects from "./components/projects/Projects";
import Project from "./components/projects/project/Project";
import { userApi } from "./api/userApi";
import { useStore } from "./store/store";
import CreateProject from "./components/projects/createProject/CreateProject";
import AddEmployee from "./components/projects/addEmployee/AddEmployee";
import CreateTask from "./components/Task/CreateTask";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App() {
  const { userStore } = useStore()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userApi.checkAuth()
        .then(response => response.data)
        .then(data => {
          userStore.setNewValues(data.user)
          userStore.setLoggedIn(data.accessToken)
        })
    }
  }, [])

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reg" element={<Reg />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/create-task/:id" element={<CreateTask />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
