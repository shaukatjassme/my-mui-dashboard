import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Button, Box } from '@mui/material';
import useProducts from '../lib/useProducts';

const ProductList = ({ handleAddToCart }) => {
  const { products, loading } = useProducts();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
             
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ${product.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <Box display="flex" justifyContent="center" marginTop={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
