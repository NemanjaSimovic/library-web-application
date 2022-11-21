import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input()
  allBooks: Book[] = [];

  displayedColumns: string[] = ['title', 'author', 'genre'];
  dataSource!: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private libraryService: LibraryService, private router: Router) { }

  ngOnInit(): void {
  }

}
