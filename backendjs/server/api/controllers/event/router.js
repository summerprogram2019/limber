import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.get)
  .get('/:id', controller.getOne)
  .put('/:id', controller.update)
  .post('/join/:id', controller.join);
