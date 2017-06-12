const router = require('express').Router();
const employeeController = require('../controllers/employeeController');

router.get("/employees", employeeController.getEmployees );
router.post("/employees", employeeController.postEmployee );

module.exports  = router;
