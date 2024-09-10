import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

const Crud: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    const getProducts = async () => {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
    };

    const deleteProduct = async (productId: number) => {
        if (localStorage.getItem("login") === null) {
            alert("You have to login through login/register");
            navigate("/login");
        } else {
            await axios.delete(`http://localhost:3000/products/${productId}`);
            alert("Deleted successfully from Menu card");
            getProducts(); // Refresh the product list after deletion
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Menu
                </Typography>
                <hr />
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item xs={12} md={4} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="140"
                                    image={product.image}
                                    title={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Id: {product.id}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Category: {product.category}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: {product.price}
                                    </Typography>
                                    <Box mt={2}>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={4}>
                    <Button variant="outlined" color="primary" component={Link} to='/admin'>
                        Back
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Crud;