import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, Card, CardMedia, CardContent } from '@mui/material';

const FakeAPI = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Box >
      <Typography variant="h4" gutterBottom> API Data</Typography>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="250"
               
                image={`https://i.pravatar.cc/150?img=${item.id}`}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>{item.email}</Typography>
                <Typography>{item.phone}</Typography>
                <Typography>{item.company.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FakeAPI;
