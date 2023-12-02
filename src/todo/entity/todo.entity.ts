import { Field, Int, ObjectType } from "@nestjs/graphql";

//asi quiero que se vea un registro en la base de datos
//con objectType le digo que este es mi objeto personalizado

@ObjectType() 
export class Todo {

    //la promesa me dice que field me devuelve un tipo integer
    @Field(()=> Int)
    id: number;

    @Field(()=> String)
    description: string;

    @Field(()=>Boolean)
    done:boolean=false;
}