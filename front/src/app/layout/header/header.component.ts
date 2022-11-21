import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userRole: number = 0;

  constructor(private router: Router, private LibraryService: LibraryService) {
    this.LibraryService.curUserSubject.subscribe((data) => {
      this.userRole = data.roleId? data.roleId: 0;
    });
  }

  ngOnInit(): void {
    var role = this.LibraryService.getCurUser()?.roleId;
    this.userRole = role? role: 0;
  }

  // ngOnDestroy(){
  //   this.userService.curUserSubject.unsubscribe();
  // }

  logout(){
    this.userRole = 0;
    this.LibraryService.clearCurUser();
    this.router.navigate(['login']);
  }

}
