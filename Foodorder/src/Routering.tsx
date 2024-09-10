import { RouteObject } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import FoodList from './components/User/FoodList';
import Cart from './components/User/Cart';
import OrderSummary from './components/User/OrderSummary';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin',
    element: <AdminDashboard/>
  },
  {
    path: '/user/food-list',
    element: <FoodList/>
  },
  {
    path: '/user/cart',
    element: <Cart/>
  },
  {
    path: '/user/orders',
    element: <OrderSummary/>
  }
];

export default routes;
