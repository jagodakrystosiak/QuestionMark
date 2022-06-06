const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    name: String,
    categoryId: mongoose.ObjectId,
}, {
    timestapms: true
});

const Forum = mongoose.model('Forum', ForumSchema);
module.exports = Forum;