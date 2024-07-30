// pages/fakeStoreUsers.js
import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, Avatar } from '@mui/material';

const FakeStoreUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Box >
      <Typography variant="h4" gutterBottom> Store Users</Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Paper>
              <Box p={2} display="flex" alignItems="center">
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${user.email}`} // Using a placeholder image service
                  alt={user.name.firstname}
                  sx={{ marginRight: 2 }}
                />
                <Box>
                  <Typography variant="h6">{user.name.firstname} {user.name.lastname}</Typography>
                  <Typography>{user.email}</Typography>
                  <Typography>{user.phone}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FakeStoreUsers;
