import { Request, Response, Router } from 'express';
import ImageController from '../controller/ImageController';

class ImageRouter {
  public router: Router;
  public imageRoutes: ImageRouter;
  private imageController: ImageController;

  constructor() {
    this.imageController = new ImageController();
    this.router = Router();
    this.setRoutes();
  }

  public setRoutes() {
    this.router
      .post('/', (req: Request, res: Response) => this.imageController.uploadImage(req, res))
  }
}

export default new ImageRouter().router;