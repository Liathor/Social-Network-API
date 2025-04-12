import { Schema, model, Types, Document, ObjectId } from 'mongoose';

interface IThought extends Document { 
  _id: ObjectId;
  thoughtText?: string;
  username?: string;
  createdAt: Date | string;
  reaction?: string[];
}

const thoughtSchema = new Schema<IThought>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date: unknown) => {
        if (date instanceof Date) {
          return date.toISOString();
        }
        if (typeof date === 'string') {
          return date;
        }
        return new Date().toISOString();
      }
    },
    reaction: [
      {
      type: Schema.Types.ObjectId,
      ref: 'reactions',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reaction?.length;
});

const Thought = model('thoughts', thoughtSchema);

export default Thought;
