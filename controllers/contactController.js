const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModule");

// @desc Get all contacts
// @routes GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  const recentContacts = await Contact.find().sort({ lastViewedAt: "desc" });
  const combinedContacts = {
    contacts,
    recentContacts,
  };

  res.status(200).json(combinedContacts);
});

// @desc Get a contact
// @routes GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  contact.lastViewedAt = new Date();
  await contact.save();
  res.json(contact);
});

// @desc Post a contact
// @routes POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  try {
    console.log("the request body is:", req.body);
    const imageData = req.file

    const { firstName, lastName, email, phoneNumber, image } = req.body;
    if (!firstName || !email || !lastName || !phoneNumber) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      image: imageData,
      user_id: req.user.id,
    });

    console.log(contact);
    
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// @desc Update a contact
// @routes PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const { firstName, lastName, email, phoneNumber, image } = req.body;
  if (!firstName || !email || !lastName || !phoneNumber) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User can't update for other users ");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
});

// @desc Delete a contact
// @routes DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User can't update for other users ");
  }

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
