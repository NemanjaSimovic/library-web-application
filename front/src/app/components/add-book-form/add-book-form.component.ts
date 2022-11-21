import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit {

  title: string = "";
  author: string = "";
  genre: string = "";
  count: number = 1;
  //
  errorMessge: string = "";
  emptyField: boolean = true;

  books!: Book[];

  constructor(private router: Router , private libraryService: LibraryService) { }

  ngOnInit(): void {

  }



  addBook(){
    this.emptyField = false;
    this.errorMessge = "";

    if(this.title == ""){
      this.emptyField = true;
      this.errorMessge = "Title missing!";
    }
    if(this.author == ""){
      this.emptyField = true;
      this.errorMessge += "\nAuthor missing!";
    }
    if(this.genre == ""){
      this.emptyField = true;
      this.errorMessge += "\nGenre missing!";
    }
    if(this.count <= 0){
      this.emptyField = true;
      this.errorMessge += "\nCount must be greater than zero!";
    }

    if(this.emptyField){
      return;
    }

    var book = new Book(this.count, this.title, this.author, this.genre);

     this.libraryService.addBook(book).subscribe((data) => {
        this.books = data;
        console.log(this.books);
    });
  }
}
