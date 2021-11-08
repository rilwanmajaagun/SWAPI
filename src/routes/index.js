import { Router } from 'express';
import * as movieController from '../controller/movies';
import * as characterController from '../controller/character';
import validate from '../middleware/validation';
import { movieSchema, characterSchema } from '../utils/validation/schema';

const router = new Router();

router.get('/movies', movieController.getMovies);
router.post('/movies/:episodeId/comment',
  validate(movieSchema.moviesEpisodeId, 'params'),
  validate(movieSchema.addComment, 'body'),
  movieController.addComment);
router.get('/movies/:episodeId/comment', validate(movieSchema.moviesEpisodeId, 'params'), movieController.getMoviesComment);
router.get('/character', validate(characterSchema.getCharacter, 'query'), characterController.getCharacter);
export default router;
