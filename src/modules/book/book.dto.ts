import { IsNotEmpty } from "class-validator";

export class BookDTO {
  
    id?: string;

    @IsNotEmpty({ message:  "O Titulo Não Pode Fica Em Branco !"})
    title : string;

    @IsNotEmpty({ message: " A Descrição é Obrigatória"})
    description: string;
    
    bar_code: string;

};