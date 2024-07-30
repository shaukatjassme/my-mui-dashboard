import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const AddDashboardItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(''); // Reset the success message

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
      setSuccessMessage('Item added successfully!'); // Set the success message
    } catch (error) {
      console.error('Error adding data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box >
      <Typography variant="h5" gutterBottom>Add Dashboard Item</Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>} {/* Display success message */}
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
