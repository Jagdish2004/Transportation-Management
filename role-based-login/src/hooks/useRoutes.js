// src/hooks/useRoutes.js
import { useState, useEffect } from 'react';
import { addRoute } from '../firebase/firebaseConfig';


const useRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const snapshot = await database.ref('routes').once('value');
      const routesData = snapshot.val();
      const routesArray = Object.keys(routesData).map(key => ({
        id: key,
        ...routesData[key]
      }));
      setRoutes(routesArray);
    };

    fetchRoutes();
  }, []);

  return routes;
};

export default useRoutes;
