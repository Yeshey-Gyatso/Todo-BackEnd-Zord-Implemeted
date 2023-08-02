import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';


console.log("middleware reached")
export const validateSchema = (schema: z.AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try { 
    schema.parse({
    body: req.body,
    query: req.query,
    params: req.params,
  });
//   console.log(req.body)
  next();
}catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json(err.errors);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
};



