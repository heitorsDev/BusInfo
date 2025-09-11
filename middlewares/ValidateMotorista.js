import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
function ValidateMotorista(req,res,next){

    const token = req.cookies.token
    if (!token || token === 'undefined') {
        
        return res.status(403).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (err) {
        
        console.error(err)
        return res.status(401).send('Unauthorized');
    }
}
export default ValidateMotorista