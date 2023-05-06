import mongoose from 'mongoose';
import ClientsContact from "../models/clientsContact.js";
import FooterContact from "../models/FooterContact.js";

export const addClientsContact = async (req, res) => {
  const addClientsContact = new ClientsContact({
    _id: new mongoose.Types.ObjectId,
    fullName: req.body.fullName,
    email: req.body.email,
    message: req.body.message,
    phone: req.body.phone,
    requirement: req.body.requirement,
    services: req.body.services,
    timestamps: true
  });
  await addClientsContact.save()
    .then((result) => {
      res.status(201).json({ new_client: result });
    })
    .catch(error => {
      res.status(404).json({ message: error.message });
    });
};

export const getClientsContact = async (req, res) => {
  try {
    const clientsContacts = await ClientsContact.find();
    res.status(200).json(clientsContacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addFooterContact = async (req, res) => {
  const addFooterContact = new FooterContact({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    phone: req.body.phone,
    timestamps: true
  });
  await addFooterContact.save()
    .then((result) => {
      res.status(201).json({ new_client: result });
    })
    .catch(error => {
      res.status(404).json({ message: error.message });
    });
};

export const getFooterContact = async (req, res) => {
  try {
    const FooterContacts = await FooterContact.find();
    res.status(200).json(FooterContacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};