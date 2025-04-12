import { Schema, model, Types, ObjectId, Document } from 'mongoose';

interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date | string;
}

const reactionSchema = new Schema<IReaction>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = model('reactions', reactionSchema);

export default Reaction;
