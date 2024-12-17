const express = require("express");
const { addTask, deleteTask, getAllTask, updateTask } = require("../controller/taskController");
const isAuthUser = require("../middleware/isAuth");


const router = express.Router();

router.post("/add", isAuthUser, addTask)
router.delete("/delete/:id", isAuthUser, deleteTask)
router.get("/getall", getAllTask)
router.put("/update/:id", isAuthUser, updateTask)


module.exports = router;