const express = require('express');
const router = express.Router();

/**
*   *route   GET    api/contacts
*   *desc    Get all users contacts
*   *desc    Private
 */
router.get('/', (req, res) => {
    res.send('Get all contacts');
});

/**
*   *route   POST    api/contacts
*   *desc    Add new contact
*   *desc    Private
 */
router.post('/', (req, res) => {
    res.send('Add a contact');
});

/**
*   *route   PUT    api/contacts/:id
*   *desc    Update a contact
*   *desc    Private
*/
router.put('/:id', (req, res) => {
    res.send('Update a contact');
});

/**
*   *route   DELETE    api/contacts/:id
*   *desc    Delete a contact
*   *desc    Private
 */
router.delete('/', (req, res) => {
    res.send('Delete a contact');
});

module.exports = router;