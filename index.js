const express = require('express');
const axios = require('axios');
const Client = require('./models/Client');
const ClientService = require('./models/ClientService');
const Service = require('./models/Service');

const app = express();
const port = 3003;

app.use(express.json());

// const validateApiKeyAndService = async (req, res, next) => {
//   try {
//     const apiKey = req.query.API_KEY;
//     const requestedService = req.query.service;

//     if (!apiKey || !requestedService) {
//       return res.status(400).json({ error: 'API_KEY and service query parameters are required' });
//     }

//     const client = await Client.findOne({ where: { apiKey } });
//     if (!client) {
//       return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
//     }

//     const service = await Service.findOne({ where: { name: requestedService } });
//     if (!service) {
//       return res.status(404).json({ error: 'Not Found - No such service.' });
//     }

//     const clientService = await ClientService.findOne({ where: { ClientId: client.id, ServiceId: service.id } });
//     if (!clientService) {
//       return res.status(401).json({ error: 'Unauthorized - Unsubscribed Service' });
//     }

//     let targetUrl;
//     if (requestedService === 'search') {
//       targetUrl = `http://69.243.101.217:4000/v1/search?text=${req.query.text}`;
//     }   if (requestedService === 'routing') {
//       targetUrl = `http://localhost:5000/route/v1/driving-car/${req.query.text}`;
//     }
//     else if (requestedService === 'distance_matrix') {
//       targetUrl = `http://localhost:5000/route/v1/driving-car/${req.query.text}`;
//     } else {
//       return res.status(400).json({ error: 'Invalid service parameter' });
//     }

//     req.client = client;
//     req.targetUrl = targetUrl; // Pass targetUrl to the request object

//     next(); // Pass control to the next middleware/route
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const validateApiKeyAndService = async (req, res, next) => {
  try {
    const apiKey = req.query.API_KEY;
    const requestedService = req.query.service;

    if (!apiKey || !requestedService) {
      return res.status(400).json({ error: 'API_KEY and service query parameters are required' });
    }

    const client = await Client.findOne({ where: { apiKey } });
    if (!client) {
      return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
    }

    const service = await Service.findOne({ where: { name: requestedService } });
    if (!service) {
      return res.status(404).json({ error: 'Not Found - No such service.' });
    }

    const clientService = await ClientService.findOne({ where: { ClientId: client.id, ServiceId: service.id } });
    if (!clientService) {
      return res.status(401).json({ error: 'Unauthorized - Unsubscribed Service' });
    }

    let targetUrl;
    if (requestedService === 'search') {
      targetUrl = `http://localhost:4000/v1/search?text=${req.query.text}`;
    } 
    else if (requestedService === 'routing') {
      targetUrl = `http://localhost:5000/route/v1/driving-car/${req.query.text}?alternatives=true&steps=true&geometries=geojson`;
 
     }
     else if (requestedService === 'reverse_geocoding') {
      const lat = req.query.lat;
      const lon = req.query.lon;
  
      if (lat === undefined || lon === undefined || lat === null || lon === null) {
          // If latitude or longitude is null or undefined, return an error
          return res.status(400).json({ error: 'Latitude and longitude are required.' });
      }
  
      const latValue = `point.lat=${lat}`;
      const lonValue = `point.lon=${lon}`;
      const combined = `${latValue}&${lonValue}`;
  
       targetUrl = `http://localhost:4000/v1/reverse?${combined}`;
      console.log('Target URL:', targetUrl);
  
      // Proceed with your further logic using the targetUrl...
  }
   else if (requestedService === 'distance_matrix') {
      targetUrl = `http://localhost:5000/route/v1/driving-car/${req.query.text}`;
    } else {
      return res.status(400).json({ error: 'Invalid service parameter' });
    }

    req.client = client;
    req.targetUrl = targetUrl; // Pass targetUrl to the request object

    next(); // Pass control to the next middleware/route
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.get('/services', validateApiKeyAndService, async (req, res) => {
  try {
    // Get the targetUrl from the request object
    const targetUrl = req.targetUrl;

    // Make the Axios GET request using the constructed URL
    const response = await axios.get(targetUrl);

    // Send the response data to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
