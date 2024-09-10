import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Container } from "@mui/material";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [plates, setPlates] = useState<number>(0);

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Menu
            </Typography>
            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Id: {product.id}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {product.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;
