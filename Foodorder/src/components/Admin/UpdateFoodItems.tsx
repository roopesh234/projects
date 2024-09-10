import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, TextField, Button } from "@mui/material";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

const UpdateFoodItems: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newName, setNewName] = useState<string>("");
    const [newCategory, setNewCategory] = useState<string>("");
    const [newPrice, setNewPrice] = useState<number>(0);
    const [newImage] = useState<string>("");
    const navigate = useNavigate();

    const getProducts = async () => {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
    };

    const updateProducts = async (productId: number) => {
        if (localStorage.getItem("login") === null) {
            alert("If you want to enter, please login/register");
            navigate("/login");
        } else {
            const updateId = {
                image: newImage.replace("C:\\fakepath\\", ""),
                id: productId,
                name: newName,
                category: newCategory,
                price: newPrice
            };
            await axios.put(`http://localhost:3000/products/${productId}`, updateId);
            alert("Food Item was refurbished");
            getProducts(); // Refresh the product list after update
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
                                    <Typography variant="body2" color="text.secondary">
                                        Id: {product.id}
                                    </Typography>
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        placeholder="Enter updated name"
                                        onChange={e => setNewName(e.target.value)}
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Category"
                                        fullWidth
                                        placeholder="Enter updated category"
                                        onChange={e => setNewCategory(e.target.value)}
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Price"
                                        type="number"
                                        fullWidth
                                        placeholder="Enter updated price"
                                        onChange={e => setNewPrice(Number(e.target.value))}
                                        margin="normal"
                                    />
                                    <Box mt={2}>
                                        <Button variant="contained" color="warning" onClick={() => updateProducts(product.id)}>
                                            Update
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

export default UpdateFoodItems;