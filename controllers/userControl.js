const User = require('../models/userModel');

exports.create = async ({ body }, res) => {
  const NewUser = new User(body);
  NewUser.save()
    .then(() => {
      return res
        .status(201)
        .json({
          success: true,
          id: User._id,
          message: 'User created!',
        })
        .end()
    })
    .catch(err => {
      return res
        .status(400)
        .json({
          err,
          message: 'User not created'
        })
        .end()
    });
}

exports.getAll = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: err })
        .end()
    }
    if (!users.length) {
      return res.status(404)
        .json({ success: false, error: 'Users not found' })
        .end()
    }
    if (users) {
      return res
        .status(200)
        .json({
          success: true,
          data: users
        })
        .end()
    }
  })
    .catch(err => alert(err.message));
}

exports.update = async ({ params, body }, res) => {
  await User.findOneAndUpdate(
    { _id: params.id },
    body,
    { new: true },
    (err, user) => {
      if (err) {
        return res
          .status(404)
          .json({
            success: true,
            message: "User not found"
          })
          .end();
      }
      if (user) {
        return res
          .status(200)
          .json({
            success: true,
            message: "User updated!"
          })
          .end()
      }
    })
    .catch(err => alert(err.message));
}

exports.delete = async ({ params }, res) => {
  await User.findOneAndDelete(
    { _id: params.id },
    (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({
            success: false,
            error: err
          })
          .end()
      }
      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            error: "User not found"
          })
          .end()
      }
      return res
        .status(200)
        .json({
          success: true,
          message: `${user.name.first} was successfully deleted!`
        })
        .end()
    })
    .catch(err => alert(err.message));
}
