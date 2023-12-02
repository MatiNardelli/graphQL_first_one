//se crea la logica de negocio

import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import {CreateTodoInput, UpdateTodoInput } from './dtos/inputs';
import { StatusArgs } from './dtos/args/status.args';
import { empty } from 'rxjs';


@Injectable()
export class TodoService {

    //no expongo estos TODO fuera de esta clase.
    private todos: Todo[] = [
        {id:1, description:'Piedra del alma',done:false},
        {id:2, description:'Piedra del Espacio',done:true},
        {id:3, description:'Piedra del Poder',done:false},
        {id:4, description:'Piedra del Tiempo',done:false},
    ];

    get totalTodos(){
        return this.todos.length;
    }
    get comletedTodos(){
        const todos = this.findAll({status:true})
        return todos.length;
    }
    get pendingTodos(){
        //const todos = this.findAll({status:false})
        return this.todos.filter( todo => todo.done === false).length;
    }


    //creamos un metodo que retorne la lista
    //: TODO me dice que voy a devolver y activamos tipado estricto en typescript
    findAll( statusArgs:StatusArgs ): Todo[]{

        const {status} = statusArgs;

        if(statusArgs !== undefined) return this.todos.filter(todo => todo.done === status);
        
        return this.todos;
    }

    findOne(id:number): Todo{
        
        const todo = this.todos.find(todo => todo.id === id);

        if(!todo){
            throw new NotFoundException(`Todo with ${id} not found`);
        }

        return todo;
    }

    //crear, actualizar o eliminar tenemos que hacer mutaciones en graphQL. Se establece en el resolver
    create(createTodoInput:CreateTodoInput):Todo{

        const todo = new Todo();
        todo.description = createTodoInput.description;
        //... es el operador spread -> el cero es por si no existe ninguno y el +1 devuelve siempre 1 por lo menos...
        todo.id = Math.max(...this.todos.map(todo=>todo.id), 0)+1;

        this.todos.push(todo);

        return todo
    }

    update(updateTodoInput:UpdateTodoInput){
        const {id,description,done}= updateTodoInput;

        //findOne es el metodo que creamos mas arriba
        const todoToUpdate = this.findOne( id );

        if(description) todoToUpdate.description = description;
        //undefine porque si es falso no entra
        if(done !== undefined) todoToUpdate.done = done;

        this.todos = this.todos.map(todo => {
            //ternario
            return (todo.id === updateTodoInput.id) ? todoToUpdate : todo;
        })

        //para recibir cual fue el todo actualizado
        return todoToUpdate;
    }

    delete(id:number){
        const todo = this.findOne(id);

        //retorna todos los todos cuyo id sea diferente 
        this.todos = this.todos.filter(todo => todo.id !== id)

        return true;
    }
}
    

