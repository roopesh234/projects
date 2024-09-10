import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";

const AddFoodItems: React.FC = () => {
  const [newImage, setNewImage] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [newPrice, setNewPrice] = useState<number>(0);
  const navigate = useNavigate();

  const addProducts = async () => {
    if (localStorage.getItem("login") === null) {
      alert("If you want to enter, please login/register");
      navigate("/login");
    } else {
      const addNew = {
        image: newImage.replace("C:\\fakepath\\", ""),
        name: newName,
        category: newCategory,
        price: newPrice,
      };

      await axios.post("http://localhost:3000/products", addNew);
      alert("Food Item added successfully");
      navigate("/admin");
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Item to Menu
        </Typography>
        <hr />
        <Box mt={2}>
          <TextField
            type="file"
            fullWidth
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Name"
            fullWidth
            placeholder="Enter item name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Category"
            fullWidth
            placeholder="Enter item category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            placeholder="Enter item price"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            margin="normal"
          />
          <Box mt={2}>
            <Button variant="contained" color="success" onClick={addProducts}>
              Add
            </Button>
          </Box>
        </Box>
        <Box mt={2}>
          <MuiLink href="/admin" underline="none">
            <Button variant="outlined" color="primary">
              Back
            </Button>
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default AddFoodItems;
