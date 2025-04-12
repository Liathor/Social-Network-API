import { Schema, model, Types, Document, ObjectId } from 'mongoose';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

dayjs.extend(advancedFormat);

interface IThought extends Document { 
  _id: ObjectId;
  thoughtText: string;
  username: string;
  createdAt: Date | string;
  reaction?: typeof reactionSchema[];
}

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
        let actualDate: Date;
    
        if (date instanceof Date) {
          actualDate = date;
        } else if (typeof date === 'string' || typeof date === 'number') {
          actualDate = new Date(date);
        } else {
          actualDate = new Date(); // fallback
        }
    
        return dayjs(actualDate).format('MMM Do, YYYY [at] hh:mm a');
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
        let actualDate: Date;
    
        if (date instanceof Date) {
          actualDate = date;
        } else if (typeof date === 'string' || typeof date === 'number') {
          actualDate = new Date(date);
        } else {
          actualDate = new Date(); // fallback
        }
    
        return dayjs(actualDate).format('MMM Do, YYYY [at] hh:mm a');
      }
    },
    reaction: [reactionSchema],
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
