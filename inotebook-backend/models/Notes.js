const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:
    {
      type: String,
      required: true,
    },
  description:
    {
      type: String,
    },
  tag:
    {
      type: String,
      default: "General",
    },
  timestamp:
    {
      type: Date,
      required: true,
      default: Date.now,
    }
});

const Note=mongoose.model("notes", NotesSchema);
Note.createIndexes();
module.exports=Note;