import * as bodyParser from 'body-parser';
import compression = require('compression');
import cookieParser = require('cookie-parser');
import cors = require('cors');
import express = require('express');
import * as helmet from 'helmet';
import logger = require('morgan');
import imageRouter from './routes/ImageRouter';
import utils from './utils/Utils';
const fileUpload = require('express-fileupload');

class Server {
  public app: express.Application;
  private url: string = utils.getApiUrl() as string;

  constructor() {
    this.app = express();
    utils.app = this.app;
    this.setConfig();
    this.routes();
  }

  public routes(): void {
    this.app.use(`${this.url}image`, imageRouter);
  }

  public setConfig(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(fileUpload({ createParentPath: true }));
  }
}

export default new Server().app;