export class Book {
    id?: number;
    title?: string;
    author?: string;
    genre?: string;
    count: number;

    constructor(count: number, title?: string, author?: string, genre?: string){
        this.title = title? title: "";
        this.author = author? author: "";
        this.genre = genre? genre: "";
        this.count = count;
    }
}
