import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, 
  Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data);

  };

  @Get()
  async findAll() {
    try {
      const books = await this.bookService.findAll();
      return { message: 'Livros encontrados com sucesso', books };

    } catch (error) {
      throw new HttpException('Erro ao buscar livros', HttpStatus.INTERNAL_SERVER_ERROR);

    };
  };

  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
  @Put(":id")
  async update(@Param("id") id: string, @Body() data: BookDTO) {
    try {
      const bookExists = await this.bookService.checkBookExistence(id);
      
      if (!bookExists) {
        throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND);
      };

      const booksUpdate = await this.bookService.update(id, data);

      return { message: 'Livro Atualizado !', booksUpdate };

    } catch (error) {

      if(error instanceof HttpException) {
        throw error;
      };

      throw new HttpException('Erro em Atualizar o livros !', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const bookExists = await this.bookService.checkBookExistence(id);

      console.log('bookExists:', bookExists);

      if (!bookExists) {
        throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND);
      };

      const booksDelete = await this.bookService.delete(id);

      return { message: 'Livro Deletado com Sucesso.', booksDelete };
    } catch (error) {
      // Captura a exceção lançada no bloco try
      if (error instanceof HttpException) {
        // Se for uma HttpException, lança novamente para retornar a resposta personalizada
        throw error;
      };

      console.error('Erro:', error);

      throw new HttpException('Erro em Deletar o livro!', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };
};
