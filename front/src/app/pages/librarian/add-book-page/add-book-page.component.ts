import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.css']
})
export class AddBookPageComponent implements OnInit {


  displayedColumns: string[] = ['title', 'author', 'genre', 'count'];
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  title: string = "";
  author: string = "";
  genre: string = "";
  count: number = 1;
  //
  errorMessge: string = "";
  emptyField: boolean = true;

  allBooks!: Book[];

  constructor(private router: Router , private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.checkUserLibrarian();
    this.getAllBooks();
  }

  addBook(){
    this.emptyField = false;
    this.errorMessge = "";

    if(this.title == ""){
      this.emptyField = true;
      this.errorMessge = "Title missing! ";
    }
    if(this.author == ""){
      this.emptyField = true;
      this.errorMessge += "\nAuthor missing! ";
    }
    if(this.genre == ""){
      this.emptyField = true;
      this.errorMessge += "\nGenre missing! ";
    }
    if(this.count <= 0){
      this.emptyField = true;
      this.errorMessge += "\nCount must be greater than zero! ";
    }

    if(this.emptyField){
      return;
    }

    var book = new Book(this.count, this.title, this.author, this.genre);

     this.libraryService.addBook(book).subscribe((data) => {
        this.allBooks = data;
        this.dataSource = new MatTableDataSource<Book>(this.allBooks);
        this.dataSource.paginator = this.paginator;
    });
  }

  getAllBooks(): void{
    this.libraryService.getAllBooks().subscribe(data =>{
      this.allBooks = data;
      this.dataSource = new MatTableDataSource<Book>(this.allBooks);
      this.dataSource.paginator = this.paginator;
    });
  }
}
