const router = require("express").Router();
const Control = require("./controllers/employeeControl");



router.get('/status', (req, res) => {
    return res.status(200).json({ success: true, message: "We are up and running" })
});

router.post('/employee', Control.create);
router.get('/employees', Control.getAll);
router.patch('/employee/:id', Control.update);
router.delete('/employee/:id', Control.delete);

module.exports = router;
