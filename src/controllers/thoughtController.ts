import { Thought, User, Reaction } from '../models/index.js';
import { Request, Response } from 'express';


  // Get all thoughts
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get single thought by id
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

// Add new thought
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { applications: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the thought 🎉');
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  }

  // Add Reaction to thought
  export const addReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // Remove reaction from thought
  export const removeReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // // TODO: Add comments to the functionality of the updateApplication method
  // export const updateApplication = async (req: Request, res: Response) => {
  //   try {
  //     const application = await Application.findOneAndUpdate(
  //       { _id: req.params.applicationId },
  //       { $set: req.body },
  //       { runValidators: true, new: true }
  //     );

  //     if (!application) {
  //       return res.status(404).json({ message: 'No application with this id!' });
  //     }

  //     res.json(application);
  //     return;
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json(err);
  //     return;
  //   }
  // }

  // // TODO: Add comments to the functionality of the deleteApplication method
  // export const deleteApplication = async (req: Request, res: Response) => {
  //   try {
  //     const application = await Application.findOneAndDelete({ _id: req.params.applicationId });

  //     if (!application) {
  //       return res.status(404).json({ message: 'No application with this id!' });
  //     }

  //     const user = await User.findOneAndUpdate(
  //       { applications: req.params.applicationId },
  //       { $pull: { applications: req.params.applicationId } },
  //       { new: true }
  //     );

  //     if (!user) {
  //       return res.status(404).json({
  //         message: 'Application created but no user with this id!',
  //       });
  //     }

  //     res.json({ message: 'Application successfully deleted!' });
  //     return;
  //   } catch (err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  // }