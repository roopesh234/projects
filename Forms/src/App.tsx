import Register from './components/Register';
import ViewReg from './components/ViewReg';
import { useRoutes } from 'react-router-dom';

function App() {
  const routes = useRoutes([
    { path: "/", element: <Register /> },
    { path: "viewreg", element: <ViewReg /> }
  ]);

  return routes;
}

export default App;
