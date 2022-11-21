import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { ExtendedReserv } from '../models/extended-reserv.model';
import { Reservation } from '../models/reservation.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient, private router: Router) { }

  uri = 'http://localhost:5072';

  public errorMsg = "";

  public curErrorSubject =  new Subject<string>();

  emmitCurError(msg: string){
    this.curErrorSubject.next(msg);
  }


  //obzirom da se datumi u bazi cuvaju po GMT vremenskoj zoni,
  //pri dovodjenju datuma s backenda na frontend konverzija se ne vrsi kako treba,
  //tako da sam napravio ove 2 metode koje pronalaze offset za nasu vremensku zonu i konvertuju GMT vremena adekvatno za nasu vremensku zonu.
  getMilisecOffset(date: Date){
    var offset = new Date(date).getTimezoneOffset();
    return offset*60*1000;
  }

  GMTtoLocalExtendRsv(reservs: ExtendedReserv[]): ExtendedReserv[]{
    reservs.forEach(element => {
      if(element.dueDate == null){
        element.dueDate == null;
      }else{
        var offset = this.getMilisecOffset(element.dueDate);
        var dt: Date = new Date(element.dueDate!);
        dt.setTime(dt.getTime() - offset);
        element.dueDate = dt;
      }
    });
    return reservs;
  }

  getCurUser(): User | null{
    var user = localStorage.getItem("curUser");
    if(user)
      return JSON.parse(user);
    else
      return null;
  }
  setCurUser(user: User): void{
    localStorage.setItem('curUser', JSON.stringify(user));
  }
  clearCurUser(): void{
    localStorage.setItem('curUser', "");
  };

  //returns -1 if user is not logged in
  getCurUserRole(): number {
    if(!this.getCurUser()){
      return -1;
    }
    return this.getCurUser()?.roleId!;
  }


  //in database role librarian as id=1
  checkUserLibrarian(){
    var usrRole = this.getCurUserRole();
    if(usrRole != 1){
      alert("This page is only available to Librarian users!");
      this.router.navigate(["/"]);
    }
  }

  //in database role patron has id=2
  checkUserPatron(){
    var usrRole = this.getCurUserRole();
    if(usrRole != 2){
      alert("This page is only available to Patron users!");
      this.router.navigate(["/"]);
    }
  }

  public curUserSubject =  new Subject<User>();

  emmitCurUser(user: User){
    this.curUserSubject.next(user);
  }

  // 1. Login deo
  loginUser(username: string, password: string){
    var body = {
      username: username,
      password: password
    }
    return  this.http.post<User>(`${this.uri}/api/User/login`, body)
    .pipe(catchError(this.handleError));
  }

  // 1.b handluje errore pri logovanju
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      alert(error.error);
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

 // 2. Dodavanje knjiga, kao i dohvatanje svih knjiga
  getAllBooks(){
    return this.http.get<Book[]>(`${this.uri}/api/Book`);
  }

  getAllBooksCurrentCount(){
    return this.http.get<Book[]>(`${this.uri}/api/Book/currentcount`);
  }

  addBook(book: Book){
    return this.http.post<Book[]>(`${this.uri}/api/Book`, book);
  }

  addReservationReturnCurrentCountBook(reservation: Reservation){
    return this.http.post<Book[]>(`${this.uri}/api/Reservation`, reservation);
  }

  checkUserReservationLimit(){
    const params = new HttpParams().append('userId', this.getCurUser()?.id!);
    return this.http.get<boolean>(`${this.uri}/api/Reservation/user/limit/reached`, {params: params});
  }

  getReservationsByUserId(){
    var userId = this.getCurUser()?.id!;
    return this.http.get<ExtendedReserv[]>(`${this.uri}/api/Reservation/${userId}`);
  }

  getUnapprovedReservations(){
    return this.http.get<ExtendedReserv[]>(`${this.uri}/api/Reservation/unapproved`);
  }

  getApprovedReservations(){
    return this.http.get<ExtendedReserv[]>(`${this.uri}/api/Reservation/approved`);
  }

  RemoveReservations(id: number){
    return this.http.delete<ExtendedReserv[]>(`${this.uri}/api/Reservation/${id}`);
  }

  approveReservation(reservation: Reservation){
    var id = reservation.id;
    var body = {
      id: reservation.id,
      bookId: reservation.bookId,
      userId: reservation.userId,
      dueDate: reservation.dueDate,
    }
    return this.http.put<ExtendedReserv[]>(`${this.uri}/api/Reservation/${id}`, body);
  }

}
