import User from "../model/userModel.js";

export const createUser = async (req, res) => {
    try {
        const userData = new User(req.body);
        const {email} = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        const savedUser = await userData.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" });
    }
};

export const fetch = async (req, res) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({ error: 'No users found.' });
        }
        res.status(200).json(users);  
    }  catch (error) {
       res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};

export const update= async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User
            .findByIdAndUpdate(id, req
            .body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" });
    }
};
 
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" });
    }
};
