import wording from '../config/Word';
import utils from '../utils/Utils';

export default function authenticateBefore(target: any, key: any, descriptor: PropertyDescriptor) {
  descriptor = Object.getOwnPropertyDescriptor(target, key);
  const originalMethod = descriptor.value;
  descriptor.value = function() {
    const args = [];
    for (const arg of Array.from(arguments)) {
      args.push(arg);
    }
    const req = args[0];
    const res = args[1];
    const token = req.headers['x-access-token'] || req.body.token || null;
    if(utils.getAuthorizedTokens().includes(token)) originalMethod.apply(this, args);
    else 
      res.status(401).json({
        success: false,
        message: wording.unauthorized
      });
    }
  return descriptor;
}