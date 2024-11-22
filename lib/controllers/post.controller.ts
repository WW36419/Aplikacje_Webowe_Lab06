import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
   public path = '/api/post';
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.get(`${this.path}s`, this.getAll);
       this.router.get(`${this.path}/:id`, this.getOne);

       this.router.post(`${this.path}`, this.addData);
       this.router.post(`${this.path}/:id`, this.spliceData);
       this.router.post(`${this.path}/:num`, this.addMulData);

       this.router.delete(`${this.path}s`, this.delAll);
       this.router.delete(`${this.path}/:id`, this.delOne);
   }
   

   private getAll = async (request: Request, response: Response, next: NextFunction) => {
       response.status(200).json(testArr);
   };

   private getOne = async (request: Request, response: Response, next: NextFunction) => {
       const { id } = request.params;
       response.status(200).json(testArr[parseInt(id)]);
   };


   private addData = async (request: Request, response: Response, next: NextFunction) => {
       const { elem } = request.body;
       testArr.push(elem);

       response.status(200).json(testArr);
   };

   private addMulData = async (request: Request, response: Response, next: NextFunction) => {
       const { elem } = request.body;
       const { num } = request.params;
       for (let i=0; i<parseInt(num); i++)
        testArr.push(elem[i]);

       response.status(200).json(testArr);
   };

   private spliceData = async (request: Request, response: Response, next: NextFunction) => {
       const { elem } = request.body;
       const { id } = request.params;
       testArr.splice(parseInt(id), 0, elem)

       response.status(200).json(testArr);
   };


   private delAll = async (request: Request, response: Response, next: NextFunction) => {
       testArr = [];
       response.status(200).json(testArr);
   };

   private delOne = async (request: Request, response: Response, next: NextFunction) => {
       const { id } = request.params;
       testArr.splice(parseInt(id), 1)
       response.status(200).json(testArr[parseInt(id)]);
   };

}

export default PostController;