const { addRoute } = require('./firebaseConfig');

// Example route data
const route1 = {
  coordinates: [[51.505, -0.09], [51.515, -0.1], [51.52, -0.12]]
};

const route2 = {
  coordinates: [[51.505, -0.08], [51.515, -0.1], [51.52, -0.13]]
};

// Add route data to Firebase
addRoute('route1', route1.coordinates);
addRoute('route2', route2.coordinates);
