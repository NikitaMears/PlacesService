const express = require('express');
const app = express();
const placesRoutes = require('./routes/placesRoutes');
const cors = require('cors');


// Middleware to parse JSON bodies
app.use(express.json());

// Use places routes
const corsOptions = {
  origin: ['localhost:3000', 'http://map.ethiomaps.com'],
};

// Use CORS middleware with specified options
app.use(cors());



app.use('/', placesRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
