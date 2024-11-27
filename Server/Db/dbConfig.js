const mongoose = require("mongoose")
const DbConnect = () => {
    mongoose.connect(
      "mongodb+srv://crud:crud@cluster0.eke1e.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"
    );
}
module.exports = DbConnect