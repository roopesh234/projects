import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Typography, Box, Button, ButtonGroup } from "@mui/material";

const Admin: React.FC = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Admin Operations
                </Typography>
            </Box>
                <Box color='white' >
                    <Button component={Link} to="/adminView" sx={{
                        ml:5,
                        borderRadius:0,
                        width:150,
                        backgroundColor:'black'
                    }}>Dishes Menu</Button>
                    <Button component={Link} to="/crud" sx={{
                        ml:5,
                        borderRadius:0,
                        width:150,
                        backgroundColor:'black'
                    }}>Delete Dish</Button>
                    <Button component={Link} to="/additems" sx={{
                        ml:5,
                        borderRadius:0,
                        width:150,
                        backgroundColor:'black'
                    }}>Add Dish</Button>
                    <Button component={Link} to="/deleteUsers" sx={{
                        ml:5,
                        borderRadius:0,
                        width:150,
                        backgroundColor:'black'
                    }}>Disable User</Button>
                    <Button component={Link} to="/updateProduct" sx={{
                        ml:5,
                        borderRadius:0,
                        width:150,
                        backgroundColor:'black'
                    }}>Update Dish</Button>
                    <Button component={Link} to="/Todaybill" sx={{
                        ml:5,
                        borderRadius:0,
                        width:150,
                        backgroundColor:'black'
                    }}>Today's Bills</Button>
                </Box>
            <Outlet />
        </Container>
    );
};

export default Admin;