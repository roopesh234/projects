import { useRoutes } from 'react-router-dom';
import routes from './Routering'; // Assuming you have a routes file or define routes here

const App = () => {
  const routing = useRoutes(routes); // Define your routes in a separate file or inline

  return (
    <div>
      {routing}
    </div>
  );
};

export default App;
