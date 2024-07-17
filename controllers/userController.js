
const UserModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address, dob } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      dob,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: "30d" });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone, address, dob } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.dob = dob || user.dob;

    await user.save();

    res.json({ user, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
