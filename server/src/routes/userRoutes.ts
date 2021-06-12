import { Router } from 'express';
import { update, index,show,store, remove } from '../controllers/userController';
import { authorize, protect } from "../middleware";
import { updateProfileValidation,userValidation, validate } from '../validation';

const router = Router();

router.use(protect);

router
  .route("/")
  .get(index)
  .post(protect, authorize("admin"), userValidation(), validate, store);

router.route('/:id').patch(updateProfileValidation(), validate, update).get(show).delete(protect, authorize("admin"), remove);

export { router as userRoutes };
