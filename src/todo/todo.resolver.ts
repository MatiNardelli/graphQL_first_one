
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput,UpdateTodoInput,StatusArgs  } from './dtos';
import { AggregationsType } from './types/aggregation.type';



//con el ()=> Todo le decimos a graphQL que el resolver va a trabajar con todo lo relacionado a TODO
@Resolver(()=> Todo)
export class TodoResolver {

    //inyectamos nuestro servicio en el resolver
    constructor(
        private readonly todoService: TodoService
    ){}

    //la promesa adentro me dice que devuelve un tipo string
    //el "todo" digo al graphQL que devuelva arrelgo del objeto TODO
    //la [] indica que vamos a recibir un arreglo de TODO
    @Query(()=> [Todo],{name:'todos'})
    //le digo en typescript que regrese un arreglo del tido TODO, arriba graphQL
    findAll(
        //en los decoradores tipo ARGS (status.args) no agregar nada entre() aca porque tendria que usar un input y el args da error
        @Args() statusArgs: StatusArgs
    ): Todo[]{
        return this.todoService.findAll(statusArgs);
    }

    @Query(()=>Todo,{name:'todo'})
    findOne(
        //el args sin nullable porque si no, no anda
        @Args('key',{type:()=>Int}) id:number):Todo{
        return this.todoService.findOne(id);
    }
    
    //con la orimesa le digo que va a regressa a graphQL
    //crear, actualizar o eliminar tenemos que hacer mutaciones en graphQL.
    @Mutation(()=>Todo,{name:'createTodo'})
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ){
        
        return this.todoService.create(createTodoInput);
    }

    @Mutation(()=>Todo,{name:'updateTodo'})
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ){
        return this.todoService.update(updateTodoInput);
    }


    @Mutation(()=> Boolean)
    removeTodo(
        //args de arguments
        @Args('id', {type: ()=> Int}) id:number
    ){
        return this.todoService.delete(id);
    }

    //Aggregations
    @Query(()=>Int,{name:`totalTodo`})
    totalTodos(): number{
        return this.todoService.totalTodos;
    }
    //completedTodo
    @Query(()=>Int,{name:`completedTodo`})
    completedTodos(): number{
        return this.todoService.comletedTodos;
    }

    //pendingTodo
    @Query(()=>Int,{name:`pendingTodo`})
    pendingTodos(): number{
        return this.todoService.pendingTodos;
    }

    @Query(()=>AggregationsType)
    aggregations(): AggregationsType{
        return{
            completed: this.todoService.comletedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodoCompleted: this.todoService.totalTodos,
        }
    }
}
