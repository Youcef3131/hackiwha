const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const UserControllers = require("../controllers/user");
const upload = require("../multer");

router.post("/auth/register", UserControllers.registreUser);
router.post("/auth/login", UserControllers.loginUser);
router.get("/users", UserControllers.getAllUsers);
router.get("/user", authenticateToken, UserControllers.getUserDetails);
router.delete("/users/:id", authenticateToken, UserControllers.deleteUser);
router.put(
  "/users",
  [authenticateToken, upload.single("image")],
  UserControllers.UpdateUser
);

module.exports = router;
