import Employee from '../models/Employee.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    console.log(req.body.email)
    if (!employee) {
      return res.status(401).json({ msg: 'employee does not exist!' });
    }
    const password = await bcrypt.compare(req.body.password, employee.password);
    if (!password) {
      return res.status(401).json({ msg: 'Incorrect password!' });
    }
    const token = jwt.sign({
      name: employee.name,
      role: employee.role,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      id: employee._id,
      photo: employee.photo,
      position: employee.position,
    }, 'blackpearl', { expiresIn: "24h" });
    res.status(200).json({
      name: employee.name,
      role: employee.role,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      token: token,
      id: employee._id,
      photo: employee.photo,
      position: employee.position,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Login failed!', error: error });
  }
}
