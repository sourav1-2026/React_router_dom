
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import {deepOrange,deepPurple} from '@mui/material/colors';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:1337'

// import robot font

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Home from './routes';
import Layout from './routes/layout';
import Teachers, {loader as TeachersLoader} from './routes/teachers';
import ViewTeacher,{loader as ViewTeacherLoader} from './routes/ViewTeacher';
import CreateTeacher, {
  action as CreateTeacherAction,
}  from './routes/CreateTeacher';
import EditTeacher,{
  loader as EditTeacherLoader,
  action as EditTeacherAction,
} from './routes/edit-teacher';

import DeleteTeacher,{action as DeleteTeacherAction,} from './routes/delete-teacher';

const theme=createTheme({
  palette:{
    primary: deepPurple,
    secondary: deepOrange
  }
})

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: 
      [
        {
          index: true,
          element: <Home />,
        },
        {
          path:"teachers",
          element:<Teachers></Teachers>,
          loader:TeachersLoader,
          children: 
          [
            {
              path:":id/view",
              element: <ViewTeacher></ViewTeacher>,
              loader: ViewTeacherLoader
            },
            {
              path:"create",
              element: <CreateTeacher></CreateTeacher>,
              action: CreateTeacherAction,
                
            },
            {
              path: ':id/edit',
              element: <EditTeacher></EditTeacher>,
              loader : EditTeacherLoader,
              action: EditTeacherAction,
            },
            {
              path : ':id/delete',
              element: <DeleteTeacher></DeleteTeacher>,
              action : DeleteTeacherAction
            }
          ]
        }
      ],
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
)


//1.12.32