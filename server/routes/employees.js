import express from 'express';
import Employee from "../models/Employee.js";
import checkAuth from "../middleware/checkAuth.js";
import bcrypt from 'bcrypt';

const router = express.Router();

// Get all employees
router.get('/', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const employees = await Employee.find().select('-password');
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get an employee by ID
router.get('/:id', getEmployee, async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id).select('-password');
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new employee
router.post('/', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const employee = new Employee({
            fullName: req.body.fullName,
            email: req.body.email,
            employeeId: req.body.employeeId,
            password: hashedPassword,
            position: req.body.position,
            phone: req.body.phone,
            address: req.body.address,
            photo: req.body.photo,
            role: req.body.role,
            status: req.body.status,
            doj: req.body.doj,
            timestamps: true
        });
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an employee by ID
router.patch('/:id', checkAuth('superadmin' || 'admin'), getEmployee, async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...update } = req.body;
        if (password !== undefined) {
            update.password = await bcrypt.hash(password, 10);
        }
        const employee = await Employee.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Middleware to get employee by ID
async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id).populate('developerWorks');
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    req.employee = employee;
    next();
}

// Create a new developer work entry for an employee
router.post('/:id/developerWorks', getEmployee, async (req, res) => {
    const developerWork = req.body;
    req.employee.developerWorks.push(developerWork);
    try {
        const updatedEmployee = await req.employee.save();
        res.status(201).json(updatedEmployee.developerWorks.slice(-1)[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all developer works for an employee
router.get('/:id/developerWorks', getEmployee, async (req, res) => {
    try {
        const developerWorks = req.employee.developerWorks;
        res.status(200).json(developerWorks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a developer work by ID for an employee
router.get('/:id/developerWorks/:workId', getEmployee, async (req, res) => {
    const workId = req.params.workId;
    try {
        const developerWork = req.employee.developerWorks.id(workId);
        if (!developerWork) {
            return res.status(404).json({ message: 'Cannot find developer work' });
        }
        res.status(200).json(developerWork);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a developer work by ID for an employee
router.patch('/:id/developerWorks/:workId', getEmployee, async (req, res) => {
    const workId = req.params.workId;
    try {
        const developerWork = req.employee.developerWorks.id(workId);
        if (developerWork) {
            developerWork.set(req.body);
            const updatedEmployee = await req.employee.save();
            res.status(200).json(developerWork);
        } else {
            res.status(404).json({ message: "Developer work not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a developer work by ID for an employee
router.delete('/:id/developerWorks/:workId', getEmployee, async (req, res) => {
    const workId = req.params.workId;
    try {
        const index = req.employee.developerWorks.findIndex(work => work.id === workId);
        if (index === -1) {
            return res.status(404).json({ message: 'Cannot find developer work' });
        }
        req.employee.developerWorks.splice(index, 1);
        const updatedEmployee = await req.employee.save();
        res.status(200).json({ message: 'Developer work deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get all BDM works for an employee
router.get('/:id/bdmWorks', getEmployee, async (req, res) => {
    try {
        const bdmWorks = req.employee.bdmWorks;
        res.status(200).json(bdmWorks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a BDM work by ID for an employee
router.get('/:id/bdmWorks/:workId', getEmployee, async (req, res) => {
    const workId = req.params.workId;
    try {
        const bdmWork = req.employee.bdmWorks.id(workId);
        if (!bdmWork) {
            return res.status(404).json({ message: 'Cannot find BDM work' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Create a new BDM work entry for an employee
router.post('/:id/bdmWorks', getEmployee, async (req, res) => {
    const bdmWork = req.body;
    req.employee.bdmWorks.push(bdmWork);
    try {
        const updatedEmployee = await req.employee.save();
        res.status(201).json(updatedEmployee.bdmWorks.slice(-1)[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a BDM work entry for an employee by ID
router.patch('/:employeeId/bdmWorks/:workId', getEmployee, async (req, res) => {
    const employee = res.employee;
    const work = employee.bdmWorks.id(req.params.workId);
    if (!work) {
        return res.status(404).json({ message: 'Cannot find work' });
    }
    if (req.body.title != null) {
        work.title = req.body.title;
    }
    if (req.body.description != null) {
        work.description = req.body.description;
    }
    if (req.body.hours != null) {
        work.hours = req.body.hours;
    }
    try {
        const updatedEmployee = await employee.save();
        res.status(200).json(updatedEmployee.bdmWorks.id(req.params.workId));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a BDM work entry for an employee by ID
router.delete('/:id/bdmWorks/:bdmWorkId', getEmployee, async (req, res) => {
    try {
        res.employee.bdmWorks.id(req.params.bdmWorkId).remove();
        const updatedEmployee = await res.employee.save();
        res.status(200).json({ message: 'BDM work deleted', bdmWorks: updatedEmployee.bdmWorks });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;