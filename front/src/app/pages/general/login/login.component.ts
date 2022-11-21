import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LibraryService } from 'src/app/services/library.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  //
  errorMessge: string = "";
  emptyField: boolean = true;

  constructor(private router: Router , private libraryService: LibraryService) { }

  ngOnInit(): void {

  }



  login(){
    this.emptyField = false;
    this.errorMessge = "";

    if(this.username == ""){
      this.emptyField = true;
      this.errorMessge = "Username missing!";
    }
    if(this.password == ""){
      this.emptyField = true;
      this.errorMessge += "\nPassword missing!";
    }

    if(this.emptyField){
      // console.log(this.errorMessge);
      return;
    }

     this.libraryService.loginUser(this.username, this.password).subscribe((data) => {
        this.libraryService.setCurUser(data);
        this.libraryService.emmitCurUser(data);
        this.router.navigate([""]);
    });
  }
}
