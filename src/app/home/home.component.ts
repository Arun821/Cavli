import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  urllink: File =null;
  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit(): void {
    
  }

  selectFile(event){
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(<File>event.target.files[0])
      reader.onload = (event: any) => {
        this.urllink = event.target.result
      }
    }
  }

  upload(){
    this.auth.upload(this.urllink).subscribe(
      res => console.log(res)
    )
  }
  
  logOut(){
    this.router.navigate(['/'])
  }
}
