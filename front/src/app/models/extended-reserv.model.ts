export class ExtendedReserv {
  id?: number;
  bookId?: number;
  userId?: number;
  bookTitle?: string;
  username?: string;
  dueDate: Date | null;

  constructor(id: number, username: string, bookTitle: string, bookId: number, userId: number){
    this.id = id;
    this.bookId = bookId;
    this.userId = userId;
    this.bookTitle = bookTitle;
    this.username = username;
    this.dueDate = null;
  }
}
