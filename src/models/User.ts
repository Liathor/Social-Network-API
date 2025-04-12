import { Schema, model, Types, Document, ObjectId } from 'mongoose';
import { Thought } from './index.js';

interface IUser extends Document {
  _id: ObjectId;
  thoughts: typeof Thought[];
  friends: ObjectId[];
  username: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughts: [Thought],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    username: {
      type: String,
      required: true,
      unique: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends?.length;
});

userSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email.text); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.')

const User = model('users', userSchema);

export default User;
