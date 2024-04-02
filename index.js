const express = require('express');
const app = express();
const placesRoutes = require('./routes/placesRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use places routes
app.use('/', placesRoutes);

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
