//nuevo tipo de dato aggregation -> no se junta con los tipos dto o entity

import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({description:'Todo quick aggregations'})
export class AggregationsType{

    //el field indica que es un nuevo campo desde el q se va a poder hacer queries
    @Field(()=> Int)
    total:number;
    
    @Field(()=> Int)
    pending:number;
    
    @Field(()=> Int)
    completed:number;

    @Field(()=> Int,{deprecationReason:'most use completed instead!'})
    totalTodoCompleted:number;
}