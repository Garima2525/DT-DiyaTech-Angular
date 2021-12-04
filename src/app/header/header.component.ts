import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,private userAuth:AuthService) { }
  username:any
  ngOnInit(): void {
    this.userAuth.userLoggedIn().subscribe((user:any)=>{
      // console.log(user.result)
      this.username=user.result.username?user.result.username:this.router.navigate(['/login'])
      // this.username?null:
    })
  }

  handleLogOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('username')
  }

}
