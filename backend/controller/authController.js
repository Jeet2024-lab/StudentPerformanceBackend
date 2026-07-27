import User from "../model/user.js";
import bcrypt from "bcrypt";


export const createUser = async (req, res) => {
  try {
    const {
      role,
      name,
      email,
      password,
      mobile,
      gender,
      dob,
      branch,

      enrollment,
      semester,
      section,

      employeeId,
      subject,

      adminId,
      designation,
      department
    } = req.body;
console.log(req.body);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // const hashPassword = await bcrypt.hash(password, 10);

    let userData = {
      role,
      name,
      email,
      // password: hashPassword,
      password,
      mobile,
      gender,
      dob,
      branch,
      designation,
      department,
    };
    if (role === "student") {
      userData.enrollment = enrollment;
      userData.semester = semester;
      userData.section = section;
      userData.branch = branch;
    }

    if (role === "faculty") {
      userData.employeeId = employeeId;
      userData.subject = subject;
      userData.department=department;
      userData.designation=designation;
    }

    if (role === "admin") {
      userData.adminId = adminId;
      userData.designation = designation;
    }

    const user = new User(userData);

    await user.save();

    res.status(201).json({
      message: "Registration Successful",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
//for LoginUser

export const loginUser = async (req, res) => {
  try {
    const { email, password, role, remember } = req.body;
    console.log(email + password + role + remember);
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (user.password != password) {
      return res.json({ message: "Password is invalid" });
    }
    if (user.role !== role) {
      return res.status(401).json({
        message: "Invalid role",
      });
    }
    res.json({ message: "User Login Successfully" ,user});
  } catch (err) {
    res.json({ err });
  }
};
