import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

//defino cada uno de los campos que queremos se complete a la hora de crear un nuevo TODO
//oara decirle que es input usamos el decorador inputType
@InputType()
export class UpdateTodoInput{

    @Field(()=> Int)
    @IsInt()
    @Min(1)
    id: number;

    @Field(()=>String, {description:'what needs to be done',nullable:true})
    //para poder usar los global pipes hay que adicionar en main.js el modulo correspondiente
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    //si no coloco el isOptional cuando lo quiera mandar vacio me imprime error porque el class validator obliga que se cumpla todas las validaciones
    @IsOptional()
    description?: string;

    @Field(()=>Boolean, {nullable:true})
    @IsBoolean()
    @IsOptional()
    done?: boolean;

}