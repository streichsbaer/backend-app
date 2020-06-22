require('./current_file').file(__filename);

sequelize
  .query("SELECT * FROM user WHERE id = :id ", {
    raw: true,
    replacements: { id: req.body.id }
  })
  .then(projects => {
    // Do your stuff
  });
