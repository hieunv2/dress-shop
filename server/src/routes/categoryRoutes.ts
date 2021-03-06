import { Router } from "express";
import {
  index,
  show,
  store,
  update,
  remove,
} from "../controllers/categoryController";
import { authorize, protect } from "../middleware";
import { categoryValidation, validate } from "../validation";

const router = Router();

router
  .route("/")
  .get(index)
  .post(protect, authorize("admin"), categoryValidation(), validate, store);

router
  .route("/:id")
  .get(show)
  .delete(protect, authorize("admin"), remove)
  .patch(protect, authorize("admin"), update);

export { router as categoryRoutes };
