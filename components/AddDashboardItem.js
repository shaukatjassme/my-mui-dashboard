import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddDashboardItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('clothes')
        .insert([{ title, description }]);

      if (error) {
        throw error;
      }

      console.log('Data added:', data);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>Add Dashboard Item</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </Button>
      </form>
    </Box>
  );
};

export default AddDashboardItem;
