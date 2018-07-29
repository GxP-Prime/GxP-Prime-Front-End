import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../css/typography.css', '../../css/color.css', '../../css/universal.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  logIn() {
    let userName = (document.getElementById("userName") as HTMLInputElement).value;
    if(userName == "admin") {
      this.router.navigate(['/v1/dashboard'], { replaceUrl: true });
    } else {
      this.router.navigate(['/v1/auditors'], { replaceUrl: true });
    }
  }

}
