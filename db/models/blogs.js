//We need a schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogsSchema = new Schema({
  //Describing the data
  slug : { type : String, unique : true, sparse : true},
  title: { type: String, required: true, maxlength: 96 },
  subTitle: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, default: "draft", enum: ["draft", "published", "deleted"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogsSchema); //Name and schema
