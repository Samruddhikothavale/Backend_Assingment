const router = require("express").Router();
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskcon");
const auth = require("../middleware/authmid");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:taskId", auth, updateTask);
router.delete("/:taskId", auth, deleteTask);
module.exports = router;