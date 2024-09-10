import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CartItem {
  id: number;
  name: string;
  noofplates: number;
  price: number;
}

const Cart: React.FC = () => {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const total = carts.reduce((sum, item) => sum + item.price, 0);

  const getCarts = async () => {
    const userId = localStorage.getItem("loginid");
    const res = await axios.get(`http://localhost:3000/cart?userId=${userId}`);
    setCarts(res.data);
    const quantities = res.data.reduce(
      (acc: { [key: number]: number }, item: CartItem) => {
        acc[item.id] = item.noofplates;
        return acc;
      },
      {}
    );
    setQuantities(quantities);
  };

  const savePurchase = async () => {
    if (carts.length === 0) {
      alert("Add items to cart");
      return;
    }

    const userId = localStorage.getItem("loginid");
    const purchases = carts.map((temp) => ({
      productId: temp.id,
      name: temp.name,
      price: temp.price,
    }));
    const date = new Date();
    const currentDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const myOrder = {
      userId: userId,
      date: currentDate,
      products: purchases,
    };
    await axios.post("http://localhost:3000/orders", myOrder);
    alert("Order Placed)");
  };

  const removeCart = async (cartId: number) => {
    await axios.delete(`http://localhost:3000/cart/${cartId}`);
    getCarts();
  };

  const handleIncrease = (cartId: number) => {
    const newQuantity = (quantities[cartId] || 0) + 1;
    updateCartQuantity(cartId, newQuantity);
  };

  const handleDecrease = (cartId: number) => {
    const newQuantity = (quantities[cartId] || 0) - 1;
    updateCartQuantity(cartId, newQuantity);
  };

  const updateCartQuantity = async (cartId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeCart(cartId);
    } else {
      const cartItem = carts.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.noofplates = newQuantity;
        cartItem.price = (cartItem.price / quantities[cartId]) * newQuantity;
        await axios.put(`http://localhost:3000/cart/${cartId}`, cartItem);
        setQuantities((prev) => ({ ...prev, [cartId]: newQuantity }));
        getCarts();
      }
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Cart
        </Typography>
        <hr />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Name</b>
                </TableCell>
                <TableCell align="center">
                  <b>Plates</b>
                </TableCell>
                <TableCell align="center">
                  <b>Price</b>
                </TableCell>
                <TableCell align="center">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.map((temp) => (
                <TableRow key={temp.id}>
                  <TableCell align="center">{temp.name}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup size="small" aria-label="Small button group">
                      <Button
                        onClick={() => handleDecrease(temp.id)}
                        disabled={
                          quantities[temp.id] && quantities[temp.id] > 0
                            ? false
                            : true
                        }
                      >
                        <RemoveIcon />
                      </Button>
                      <Button>
                        <Typography>{quantities[temp.id] || 0}</Typography>
                      </Button>
                      <Button onClick={() => handleIncrease(temp.id)}>
                        <AddIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="center">{temp.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeCart(temp.id)}
                      sx={{
                        backgroundColor: "black",
                        borderRadius: 0,
                      }}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} textAlign="right">
          <Typography variant="h5">Total Bill = {total}</Typography>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            component={Link}
            to="/products"
            sx={{
              backgroundColor: "black",
              borderRadius: 0,
            }}
          >
            Back To Menu
          </Button>
          <Outlet />
          <Button
            variant="contained"
            color="success"
            onClick={savePurchase}
            sx={{
              ml: 2,
              backgroundColor: "black",
              borderRadius: 0,
            }}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
