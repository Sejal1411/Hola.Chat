const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  
    chatName: {type : String},
    isGroupChat : {type : Boolean},

    users : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],

    latestMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message"
    },
    
    groupAdmin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
  },

  {
    timeStamp: true,
  },

);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
