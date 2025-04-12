import { Router } from 'express';
const router = Router();

import { getThoughts, getSingleThought, createThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/:applicationId/tags/:tagId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

export default router;
