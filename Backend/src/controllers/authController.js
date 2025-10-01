// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const { validationResult } = require("express-validator");

// // function to generate jwt token for a logged in user
// const generateToken = (user) =>
//   jwt.sign(
//     { id: user._id, email: user.email, roles: user.roles }, // embed roles inside the token
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" } // expire after 1 hour
//   );

// // register a reader (default role)
// exports.registerReader = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ message: "invalid input", errors: errors.array() });

//   const { email, password } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "email already exists" });

//     const user = await User.create({
//       email,
//       password,
//       roles: [{ blogId: null, role: "reader" }]
//     });

//     const token = generateToken(user);
//     res.status(201).json({ message: "reader registered", token });
//   } catch (err) {
//     res.status(500).json({ error: "server error: " + err });
//   }
// };

// // register an editor (only admins can do this)
// exports.registerEditor = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ message: "invalid input", errors: errors.array() });

//   try {
//     const adminUser = await User.findById(req.user.id);
//     if (!adminUser || !adminUser.roles.some(r => r.role === "admin")) {
//       return res.status(403).json({ message: "only admins can create editors" });
//     }

//     const { email, password } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "email already exists" });

//     const editorUser = await User.create({
//       email,
//       password,
//       roles: [{ blogId: null, role: "editor" }]
//     });

//     const token = generateToken(editorUser);
//     res.status(201).json({ message: "editor registered", token });
//   } catch (err) {
//     res.status(500).json({ error: "server error: " + err });
//   }
// };

// // register an admin (first admin can self-register, others only by existing admins)
// exports.registerAdmin = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ message: "invalid input", errors: errors.array() });

//   try {
//     const { email, password } = req.body;
//     const adminExists = await User.exists({ "roles.role": "admin" });

//     // if admins already exist, only another admin can create one
//     if (adminExists) {
//       const requestingUser = await User.findById(req.user.id);
//       const isAdmin = requestingUser?.roles?.some(r => r.role === "admin");
//       if (!isAdmin) {
//         return res.status(403).json({ message: "only admins can create admins" });
//       }
//     }

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "email already exists" });

//     const adminUser = await User.create({
//       email,
//       password,
//       roles: [{ blogId: null, role: "admin" }]
//     });

//     const token = generateToken(adminUser);
//     res.status(201).json({ message: "admin registered", token });
//   } catch (err) {
//     res.status(500).json({ error: "server error: " + err });
//   }
// };

// // login user and return jwt
// exports.login = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ message: "invalid input", errors: errors.array() });

//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(400).json({ message: "invalid credentials" });
//     }

//     const token = generateToken(user);
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: "server error" });
//   }
// };
