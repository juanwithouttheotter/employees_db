const Employee = require('../models/employeeModel');

exports.create = async ({ body }, res) => {
  const NewEmployee = new Employee(body);
  NewEmployee.save()
    .then(() => {
      return res
        .status(201)
        .json({
          success: true,
          id: Employee._id,
          message: 'Employee created!',
        })
        .end()
    })
    .catch(err => console.log(err.message));
}

exports.getAll = async (req, res) => {
  await Employee.find({}, (err, employees) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err })
        .end()
    }
    if (!employees.length) {
      return res.status(404)
        .json({ success: false, error: 'Employees not found' })
        .end()
    }
    if (employees) {
      return res
        .status(200)
        .json({
          success: true,
          data: employees
        })
        .end()
    }
  })
    .catch(err => console.log(err.message));
}

exports.update = async ({ params, body }, res) => {
  await Employee.findOneAndUpdate(
    { _id: params.id },
    body,
    { new: true },
    (err, employee) => {
      if (err) {
        return res
          .status(404)
          .json({
            success: true,
            message: "Employee not found"
          })
          .end();
      }
      if (employee) {
        return res
          .status(200)
          .json({
            success: true,
            message: "Employee updated!"
          })
          .end()
      }
    })
    .catch(err => console.log(err.message));
}

exports.delete = async ({ params }, res) => {
  await Employee.findOneAndDelete(
    { _id: params.id },
    (err, employee) => {
      if (err) {
        return res
          .status(400)
          .json({
            success: false,
            error: err
          })
          .end()
      }
      if (!employee) {
        return res
          .status(404)
          .json({
            success: false,
            error: "Employee not found"
          })
          .end()
      }
      return res
        .status(200)
        .json({
          success: true,
          message: `${employee.name.first}'s data was successfully deleted!`
        })
        .end()
    })
    .catch(err => console.log(err.message));
}
