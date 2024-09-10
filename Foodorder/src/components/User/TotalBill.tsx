import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

interface Product {
    userId: number;
    date: string;
    products: {
        name: string;
        price: number;
    }[];
}

const GetBill: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    let totalBillToday = 0;
    const date = new Date();
    const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const getProducts = async () => {
        const res = await axios.get("http://localhost:3000/orders");
        setProducts(res.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Today's Bills
                </Typography>
                <hr />
                <div className="row getbills">
                    {products.map((temp) => {
                        if (temp.date === currentDate) {
                            return (
                                <TableContainer component={Paper} key={temp.userId}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>User ID</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {temp.products.map((temp1, index) => {
                                                totalBillToday += temp1.price;
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>{temp.userId}</TableCell>
                                                        
                                                        <TableCell>{temp.date}</TableCell>
                                                        <TableCell>{temp1.name}</TableCell>
                                                        <TableCell>{temp1.price}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            );
                        }
                        return null;
                    })}
                </div>
                <Box mt={2} textAlign="center">
                    <Typography variant="h5">
                        Today's Total Bill = {totalBillToday}
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Button variant="outlined" component={Link} to="/admin" className="light">
                        Back To Menu
                    </Button>
                    <Outlet />
                </Box>
            </Box>
        </Container>
    );
};

export default GetBill;