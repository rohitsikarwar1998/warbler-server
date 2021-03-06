const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 160
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

messageSchema.pre('remove', async function (next) {
    //find a user
    //remove the id of the message form the message array in the user model
    //save that user 
    // return next
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this.id);

        await user.save();
        return next();
    }
    catch (err) {
        return next(err);
    }
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;