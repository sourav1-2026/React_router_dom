import React from 'react'
import axios from 'axios';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Unstable_Grid2';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';

import { useLoaderData, Outlet ,Link } from 'react-router-dom';

export const loader= async()=>{
    const res=await axios.get('/api/teachers?populate=*')
    return res.data.data
}


const Teachers = () => {
    const teachers =useLoaderData()
    
  return (
    <>

    <Outlet />
      <Grid container sx={{ py: 2 }} spacing={2}>
        {
        teachers.map(({id, attributes})=>(<Grid xs={12} sm={12} md={3} key={id} >
            <Paper>
              <Box
                component={Stack}
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                sx={{ p: 2 }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    color="gray.900"
                  >
                    {attributes.firstName} {attributes.lastName}
                  </Typography>
                  <Chip label={attributes.subject} color="secondary" />
                </Box>
                <Box>
                  <IconButton component={Link} to={`${id}/view`} color="secondary">
                    <RemoveRedEyeTwoToneIcon />
                  </IconButton>
                </Box>
              </Box>
              <img src={attributes.profile.data ?`${axios.defaults.baseURL}${attributes.profile.data.attributes.url}` :`https://via.placeholder.com/800x600/333/fff`} />
              <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={500} variant="body1">
                    {attributes.email}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {attributes.Phone}
                  </Typography>
                </Box>
                <Box>
                  <IconButton color="warning">
                    <EditTwoToneIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteTwoToneIcon />
                  </IconButton>
                </Box>
              </Stack>
            </Paper>
          </Grid>))
}
      </Grid>
      <Fab component={Link} color="secondary" to="create" src={{position: 'fixed', bottom:50 ,right:100}}>
      <AddBoxTwoToneIcon/>
    </Fab>
    </>
  );
};

export default Teachers;