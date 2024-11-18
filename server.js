const express = require('express')
const app = express()
const http = require('http')


// Question 1 
app.get('/patients', (req, res) => {
  const query = `
    SELECT patient_id, first_name, last_name, date_of_birth 
    FROM patients;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});


// Question 2 
app.get('/providers', (req, res) => {
  const query = `
    SELECT first_name, last_name, provider_specialty 
    FROM providers;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching providers:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// Question 3 
app.get('/patients/search', (req, res) => {
  const { first_name } = req.query;
  if (!first_name) {
    return res.status(400).json({ error: 'First name is required' });
  }

  const query = `
    SELECT patient_id, first_name, last_name, date_of_birth 
    FROM patients 
    WHERE first_name = ?;
  `;
  db.query(query, [first_name], (err, results) => {
    if (err) {
      console.error('Error filtering patients by first name:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// Question 4
app.get('/providers/search', (req, res) => {
  const { provider_specialty } = req.query;
  if (!provider_specialty) {
    return res.status(400).json({ error: 'Provider specialty is required' });
  }

  const query = `
    SELECT first_name, last_name, provider_specialty 
    FROM providers 
    WHERE provider_specialty = ?;
  `;
  db.query(query, [provider_specialty], (err, results) => {
    if (err) {
      console.error('Error filtering providers by specialty:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});



// listen to the server
const PORT = 3306
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})