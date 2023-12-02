import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(()=> String, { description:'Hola mundo es lo que retorna', name:'hello' })
    helloWordl(): string{
        return 'Hola Mundo';
    }

    @Query( () => Float, {name:'randomNumber'} )
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, {name:'randomFromZeroTo', description:`from zero to toCualqi`})
    getRandomFromZeroTo(
        @Args('to', {nullable:true, type:() => Int }) toCualqi: number ): number {
        const min= Math.ceil(0);
        // const max= Math.floor(100)
        return Math.floor(Math.random() * (toCualqi-min) + min);
    }   
}
