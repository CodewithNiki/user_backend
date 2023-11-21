const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage(); // Store file data in memory as Buffer
const upload = multer({ storage: storage });
const { getContacts, getContact, createContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)

router.route('/').get(getContacts).post( upload.single('image'), createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;