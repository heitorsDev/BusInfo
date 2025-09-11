import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
function ValidateAdmin(req, res, next) {
   console.log(req.user.admin)
   if (req.user.admin) {
      next()
   } else {
      return res.status(401).send('Unauthorized');
   }
}
export default ValidateAdmin