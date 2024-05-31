const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simulación de base de datos de usuarios
const users = [
    { username: 'sasaltos', password: '140400' },
    { username: 'nfsalguero', password: '12345' }
];

app.use(express.json());

// Ruta de autenticación
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (!users[username]) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (users[username] !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
