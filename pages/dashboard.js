import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Box, Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('clothes').select('*');
        console.log(data);
        if (error) {
          throw error;
        }
        setData(data || []); // Ensure data is set to an empty array if it's null
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box my={4}>
      <Typography variant="h4" color="primary" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper>
              <Box p={2}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
