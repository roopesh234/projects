import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Card, CardContent, CardMedia, Typography, Grid, Container, Box, ButtonGroup } from "@mui/material";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

interface CartItem {
    id: number;
    productId: number;
    noofplates: number;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const getCartItems = async () => {
        try {
            const userId = localStorage.getItem("loginid");
            if (userId) {
                const res = await axios.get(`http://localhost:3000/cart?userId=${userId}`);
                const cartItems = res.data as CartItem[];
                const quantities: { [key: number]: number } = {};
                cartItems.forEach(item => {
                    quantities[item.productId] = item.noofplates;
                });
                setQuantities(quantities);
            }
        } catch (error) {
            console.error("Error fetching cart items", error);
        }
    };

    const removeCart = async (cartId: number) => {
      await axios.delete(`http://localhost:3000/cart/${cartId}`);
      getCartItems();
    };

    const updateCart = async (productId: number, newQuantity: number) => {
      const userId = localStorage.getItem("loginid");
      if (!userId) {
          alert("You have to login first. Please login/register");
          navigate("/login");
          return;
      }

      try {
          // Check if the item already exists in the cart
          const product= products.find(p => p.id === productId)
          //const product = await axios.get(`http://localhost:3000/cart?userId=${userId}&productId=${productId}`)
          const res = await axios.get(`http://localhost:3000/cart?userId=${userId}&productId=${productId}`);
          // const existingCartItem = res.data[0];
          const existingCartItem = res.data.find(p => p.productId === productId);
       
           console.log('res', res, "existingCartItem", existingCartItem, productId, "product", product);
          if (existingCartItem && (existingCartItem.productId == productId)) {
          // if(product && product.length > 0){
              // Update the existing cart item
              const updatedCartItem = {
                  ...product,
                  productId,
                  noofplates: newQuantity,
                  price: existingCartItem.price / existingCartItem.noofplates * newQuantity, // Update price accordingly
              };
              if (newQuantity === 0) {
                removeCart(existingCartItem.id);
              }
              await axios.put(`http://localhost:3000/cart/${existingCartItem.id}`, updatedCartItem);
              console.log("Cart updated");
          } else{
              // Add a new cart item
              
              if (product) {
                  const newCartItem = {
                    
                      productId,
                      name: product.name,
                      userId,
                      noofplates: newQuantity,
                      price: product.price * newQuantity,
                  };

                  await axios.post(`http://localhost:3000/cart/`, newCartItem);
              }
              console.log("Cart added");
          }
          
      } catch (error) {
          console.error("Error updating cart", error);
      }
  };

    const handleIncrease = (productId: number) => {
        setQuantities(prev => {
            const newQuantities = { ...prev, [productId]: (prev[productId] || 0) + 1 };
            updateCart(productId, newQuantities[productId]);
            return newQuantities;
        });
    };

    const handleDecrease = (productId: number) => {
        setQuantities(prev => {
            const newQuantity = prev[productId] > 0 ? prev[productId] - 1 : 0;
            const newQuantities = { ...prev, [productId]: newQuantity };
            updateCart(productId, newQuantities[productId]);
            
            return newQuantities;
        });
    };

    useEffect(() => {
        getProducts();
        getCartItems();
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
                                <Typography variant="h4"><b>{product.name}</b></Typography>
                                <Typography>Category: {product.category}</Typography>
                                <Typography>Price: {product.price} ₹</Typography>
                                <Box>
                                    <ButtonGroup size="small" aria-label="Small button group">
                                        <Button 
                                            onClick={() => handleDecrease(product.id)} 
                                            disabled={(quantities[product.id] && quantities[product.id] > 0) ? false : true }
                                        >
                                            <RemoveIcon/>
                                        </Button>
                                        <Button><Typography>{quantities[product.id] || 0}</Typography></Button>
                                        <Button onClick={() => handleIncrease(product.id)}>
                                            <AddIcon/>
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;
