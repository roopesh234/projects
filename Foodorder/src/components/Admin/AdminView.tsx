import React from "react";
import { Link } from "react-router-dom";
import Products from "./AdminFoodList"
import { Button, Box, Container } from "@mui/material";

const AdminView: React.FC = () => {
    return (
        <Container>
            <Box mt={4}>
                <Products />
            </Box>
            <Box mt={2}>
                <Button variant="outlined" color="primary" component={Link} to='/admin'>
                    Back
                </Button>
            </Box>
        </Container>
    );
};

export default AdminView;