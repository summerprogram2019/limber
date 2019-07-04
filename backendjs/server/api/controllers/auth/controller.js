export class Controller {
  auth(req, res) {
    // eslint-disable-next-line no-console
    console.log(req.user);
    res.status(200).json({ success: true });
  }
}
export default new Controller();
