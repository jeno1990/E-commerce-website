const User = require("./../model/userSchema");

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const updateUser = async (id, username) => {
  const updataedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: { username: username },
    },
    { new: true }
  );
  console.log("updataedUser", updataedUser);
  return updataedUser;
};

const getUser = async (id) => {
  const user = await User.findOne({ _id: id });
  const { password, ...others } = user._doc;
  console.log(others);
  return others;
};

const getUsers = async (onlynew) => {
  const users = onlynew
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find({});
  // const {password , ...others} = users._doc
  console.log(users);
  return users;
};

const UserStat = async (lastYear)=>{
  const data = await User.aggregate([
    {$match : {createdAt: {$gte: lastYear}}},
    {$project: {
      month: {$month: "$createdAt"} //take the month number inside createdAt date
    }},
    {$group: {
      _id: "$month",
      total : {$sum:1}
    }}
  ])
  return data;
}
module.exports = { updateUser, deleteUser, getUser, getUsers, UserStat };
