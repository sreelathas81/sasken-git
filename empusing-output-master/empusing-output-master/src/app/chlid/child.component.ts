import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';




@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Output() data:any=new EventEmitter();
@Output()showSpinner=new EventEmitter();
constructor(private http:HttpClient) {}
info:any = [];
id:number;
private  headers=new HttpHeaders({'Content-type':'application/json'});  


  ngOnInit() {
  this.http.get("http://localhost:5555/data").subscribe((res:Response)=>{
    this.info=res;
  })
     
    
  
  
}
showData(a,c){
  this.data.emit(a);
  this.showSpinner.emit(c);
}
dele(aa){
const url=`${"http://localhost:5555/data"}/${aa}`;
 this.http.delete(url,{headers:this.headers}).subscribe(()=>{
    this.info = this.info.filter(item=>item.id !=aa );

  }

  )
  
  

}


}
