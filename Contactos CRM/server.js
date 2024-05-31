const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const contacts = [
    {
        id: "12345",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        role: "Prospect",
        relatedContacts: [
            {
                id: "54321",
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@example.com",
                role: "Virtual Assistant"
            }
        ],
        createdAt: "2023-01-01T12:00:00Z",
        updatedAt: "2023-05-01T12:00:00Z"
    }
];

// Ruta para obtener información de un contacto por ID
app.get('/contacts/:contactId', (req, res) => {
    const contactId = req.params.contactId;
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
        res.status(200).json(contact);
    } else {
        res.status(404).send('Contact not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
