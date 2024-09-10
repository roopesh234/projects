import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LoginIcon from "@mui/icons-material/Login";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Cart from "./components/User/Cart";
import Register from "./components/Auth/Register";
import Orders from "./components/User/Purchase";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import Products from "./components/User/FoodList";
import Admin from "./components/Admin/AdminControlPanel";
import Crud from "./components/Admin/CrudOps";
import Home from "./Home";
import AdminView from "./components/Admin/AdminView";
import GetBill from "./components/User/TotalBill";
import Users from "./components/Admin/Customer";
import UpdateFoodItems from "./components/Admin/UpdateFoodItems";
import AddFoodItems from "./components/Admin/AddFoodItems";
import { ShoppingCart } from "@mui/icons-material";

const Menu: React.FC = () => {
  const [isLogin, setIsLogin] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem("login") === "1") {
      setIsLogin(1);
    } else {
      setIsLogin(0);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: "black" }}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                allFoodinOne.hub
              </Link>
            </Typography>

            <Button
              color="inherit"
              variant="contained"
              sx={{
                width: 180,
                height: 40,
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                color: "black",
                borderRadius: 0,
              }}
              endIcon={
                <GridViewRoundedIcon
                  style={{ color: "black", marginLeft: 5, marginRight: 5 }}
                />
              }
            >
              <Link
                to="/FoodItems"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Food Items
              </Link>
            </Button>
            {isLogin === 1 && (
              <Button
                color="inherit"
                variant="contained"
                endIcon={
                  <ShoppingCart
                    style={{ color: "black", marginLeft: 5, marginRight: 5 }}
                  />
                }
                sx={{
                  width: 180,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  color: "black",
                  ml: 2,
                  borderRadius: 0,
                }}
              >
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Cart
                </Link>
              </Button>
            )}
            {isLogin === 1 && (
              <Button
                color="inherit"
                variant="contained"
                endIcon={
                  <HistoryIcon
                    style={{ color: "black", marginLeft: 5, marginRight: 5 }}
                  />
                }
                sx={{
                  width: 180,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  color: "black",
                  ml: 2,
                  borderRadius: 0,
                }}
              >
                <Link
                  to="/myorders"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  My Orders
                </Link>
              </Button>
            )}
            {isLogin === 0 && (
              <Button
                color="inherit"
                variant="contained"
                endIcon={
                  <HowToRegIcon
                    style={{ color: "black", marginLeft: 5, marginRight: 5 }}
                  />
                }
                sx={{
                  width: 180,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  color: "black",
                  ml: 2,
                  borderRadius: 0,
                }}
              >
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Register
                </Link>
              </Button>
            )}
            {isLogin === 0 && (
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  width: 180,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  color: "black",
                  ml: 2,
                  borderRadius: 0,
                }}
                endIcon={
                  <LoginIcon
                    style={{ color: "black", marginLeft: 5, marginRight: 5 }}
                  />
                }
              >
                <Link
                  to="/Login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </Link>
              </Button>
            )}
            {isLogin === 1 && (
              <Button
                color="inherit"
                variant="contained"
                endIcon={
                  <LogoutIcon
                    style={{ color: "black", marginLeft: 5, marginRight: 5 }}
                  />
                }
                sx={{
                  width: 180,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  color: "black",
                  ml: 2,
                  borderRadius: 0,
                }}
              >
                <Link
                  to="/Logout"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Logout
                </Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorders" element={<Orders />} />
          <Route path="/Login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/FoodItems" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/additems" element={<AddFoodItems />} />
          <Route path="/updateProduct" element={<UpdateFoodItems />} />
          <Route path="/deleteUsers" element={<Users />} />
          <Route path="/AdminView" element={<AdminView />} />
          <Route path="/Logout" element={<Logout setIsLogin={setIsLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Todaybill" element={<GetBill />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Menu;
