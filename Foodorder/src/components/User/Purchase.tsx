import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  userId: number;
  date: string;
  products: Product[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = localStorage.getItem("loginid");

  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/orders?userId=${userId}`);
      setOrders(response.data);
      ////setOrders((prevOrders)=> prevOrders.filter((orders) => orders.userId.toString === userId))
    } catch (error) {
      console.error("There was an error fetching the orders!", error);
    }
  };

  if (localStorage.getItem("login") !== "1") {
    alert("First you have to login");
    navigate("/login");
    return null;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Orders
      </Typography>
      <Box my={2}>
        <Grid container spacing={3}>
          {orders &&
            orders.map((order) => (
              <Grid item xs={12} key={order.userId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Date: {order.date}
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Item Name</TableCell>
                          <TableCell>Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
      <Button variant="outlined" onClick={() => navigate("/products")}>
        Back to Menu
      </Button>
    </Container>
  );
};

export default Orders;
