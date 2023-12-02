import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

//defino cada uno de los campos que queremos se complete a la hora de crear un nuevo TODO
//oara decirle que es input usamos el decorador inputType
@InputType()
export class CreateTodoInput{

    @Field(()=>String, {description:'what needs to be done'})
    //para poder usar los global pipes hay que adicionar en main.js el modulo correspondiente
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    description: string;


}