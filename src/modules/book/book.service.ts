import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) {}

    async checkBookExistence(id: string) {
        const bookExists = await this.prisma.book.findUnique({where: {id}});

        return !!bookExists;
    };

    async create(data: BookDTO) {
        const bookExists = await this.prisma.book.findFirst({where: {bar_code: data.bar_code,},});

        if(bookExists) {
            throw new HttpException('Livro Já Existe!', HttpStatus.BAD_REQUEST);
        };

        const book = await this.prisma.book.create({ data, });
        console.log(book);
        return book;
    };

    async findAll() {
        return await this.prisma.book.findMany();

    };

    async update(id: string, data: BookDTO) {
        return await this.prisma.book.update({ data, where: {id}});
    };  

    async delete(id: string) {
        return await this.prisma.book.delete({ where: { id }});
    };
};
