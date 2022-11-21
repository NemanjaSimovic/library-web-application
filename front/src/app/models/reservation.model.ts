export class Reservation {
  id?: number;
  bookId?: number;
  userId?: number;
  dueDate: Date | null;

  constructor(bookId: number, userId: number, id?: number, dueDate?: Date){
    this.id = id;
    this.bookId = bookId;
    this.userId = userId;
    if(!dueDate){
      this.dueDate = null;
    } else {
      this.dueDate = dueDate;
    }
    if(!id){
      ;
    }else{
      id = id;
    }
  }
}
