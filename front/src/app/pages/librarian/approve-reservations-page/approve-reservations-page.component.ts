import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExtendedReserv } from 'src/app/models/extended-reserv.model';
import { Reservation } from 'src/app/models/reservation.model';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-approve-reservations-page',
  templateUrl: './approve-reservations-page.component.html',
  styleUrls: ['./approve-reservations-page.component.css']
})
export class ApproveReservationsPageComponent implements OnInit {

  _close_date_days = 2;
  _miliseconds_in_1_day = 86400000;

  displayedColumns: string[] = ['username', 'bookTitle', 'id'];
  dataSource!: MatTableDataSource<ExtendedReserv>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  hours: number = 20;
  minutes: number = 0;

  dueDate: Date = new Date();
  emptyField: boolean = true;

  unapprovedReservations: ExtendedReserv[] = [];

  constructor(private router: Router , private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.checkUserLibrarian();
    this.getAllUnapprovedReservations();
    this.setDueDateWeakAhead();
  }

  setDueDateWeakAhead(){
    this.dueDate.setDate(this.dueDate.getDate()+7);
  }

  //sets hours and minutes to DueDate
  //returns false if hours and minutes are beyond their limits, return true otherwise
  formDueDate(): boolean{
    if(this.hours > 23 || this.hours < 0){
      alert("Hours must be between a number 0 and 23");
      return false;
    }
    if(this.minutes > 59 || this.minutes < 0){
      alert("Hours must be between a number 0 and 59");
      return false;
    }
    this.dueDate.setHours(this.hours);
    this.dueDate.setMinutes(this.minutes);
    return true;
  }

  approveReservation(reserv: Reservation){
    this.libraryService.approveReservation(reserv).subscribe((data) => {
      this.unapprovedReservations = data;
      this.dataSource = new MatTableDataSource<ExtendedReserv>(this.unapprovedReservations);
      this.dataSource.paginator = this.paginator;
  });
  }

  approve(extReserv: ExtendedReserv){
    if(!this.formDueDate()){
      return;
    }
    var dt = new Date();
    var diff = this.dueDate.getTime() - dt.getTime()
    // reader is most likely not able to read the book in less than 3 days.
    var limit = this._close_date_days * this._miliseconds_in_1_day;
    if( diff < limit){
      alert("Due date must be at least 48 hours ahead!");
      return;
    }

    var reserv = new Reservation(extReserv.bookId!, extReserv.userId! , extReserv.id , this.dueDate);
    this.approveReservation(reserv);
  }

  getAllUnapprovedReservations(): void{
    this.libraryService.getUnapprovedReservations().subscribe(data =>{
      this.unapprovedReservations = data;
      this.dataSource = new MatTableDataSource<ExtendedReserv>(this.unapprovedReservations);
      this.dataSource.paginator = this.paginator;
    });
  }
}
