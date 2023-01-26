const express = require("express");

const allTodos = [{nome: "aaaa", status: false}];
const todosRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");

const prisma = new PrismaClient()

// C
todosRoutes.post("/todos", async (request, response) => {
  const { name } = request.body;
  const todo = await prisma.todo.create({
  data: {
    name,
  },
  });
  // allTodos.push({name, status: false})
  return response.status(201).json(todo)
});
// R
todosRoutes.get("/todos", async (request, response) => {
  const todos = await prisma.todo.findMany()
  return response.status(200).json(todos);
})
// U
todosRoutes.put("/todos", async (request, response) => {
  const {name, id, status} = request.body;

  if(!id){
    return response.status(400).json("id is mandatory")
  }

  const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } })

  if(!todoAlreadyExist) {
    return response.status(404).json("Todo not exist")
  }

  const todo = await prisma.todo.update({
    where: {
      id,
  },
    data: {
      name,
      status,
  },
});

  return response.status(200).json(todo);
});
// D

module.exports = todosRoutes;