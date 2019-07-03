import { Request, Response } from 'express';

export class Controller {
  auth(req: Request, res: Response): void {
    res.status(200).json({ success: true });
  }
}
export default new Controller();
