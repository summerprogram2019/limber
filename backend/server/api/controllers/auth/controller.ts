import { Request, Response } from 'express';

export class Controller {
  auth(req: any, res: Response): void {
    console.log(req.user);
    res.status(200).json({ success: true });
  }
}
export default new Controller();
