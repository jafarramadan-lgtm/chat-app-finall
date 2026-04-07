 
 
 exports.profile=(req, res) => {
  const name = req.user.name;
  const role = req.user.role;
  res.json({ name: name, role: role });
 }