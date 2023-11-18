const express = require("express");
const router = express.Router();
const { getContacts, getContact, getRecentContacts, createContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)

router.route('/').get(getContacts).get(getRecentContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;