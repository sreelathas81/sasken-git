import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  id: any;
  showSpinner: any;
  pStatus: boolean;
  nstatus: boolean;
  hide: boolean=true;
  formhide: boolean;
  data1: any = [];
  hhide=true;
  dataObj:Object={};
  csvdata:any=[];
  csvdetails:Object={};
  headerRow:any=[];
  fileData: File = null;
  previewUrl:any = null;
  details:any=[];
  fileContent:string='';
  files


  constructor(private http:HttpClient,private papa:Papa) {}

  ngOnInit(){
      this.http.get("http://localhost:5555/data").subscribe((res:Response)=>{
        this.data1=res;
        console.log(this.data1)
      })
    }

  save(b,c)
  {
    this.id=b;
    this.showSpinner=c;
    setTimeout(()=>{
      this.showSpinner=false;
    },500)
    if(b==1){
      this.pStatus=true;
      this.nstatus=false;
      }if(b==10){
        this.nstatus=true;
        this.pStatus=false;
      }
      if(b<10 && b!=1){
        this.pStatus=false;
      }
    }
    
    prev(){
     
      for( let i=1;i<this.data1.length;i++){
        if(this.id===this.data1[i].id){
            this.id=this.data1[i-1].id;
            if(this.id===this.data1[0].id){
              this.pStatus=true;
              this.nstatus=false;
            }else{
              this.nstatus=false;
            }
            
        }
      }
    }
 
    next(){
      for( let i=0;i<this.data1.length-1;i++){
        if(this.id===this.data1[i].id){
            this.id=this.data1[i+1].id;
            if(this.id===this.data1[this.data1.length-1].id){
              this.nstatus=true;
              this.pStatus=false;
            }else{
              this.nstatus=false;
            }
            break;
        }
      }
    }
    newEmployee(){
      this.hide=false;
      this.formhide=false;

    }
   
    onSubmit(values){
      
    this.dataObj={
      "id":values.id,
      "name":values.name,
      "Position":values.Position,
      "imageURL":values.imageURL,
      "gender":values.gender,
      "DOB":values.DOB,
      "joiningDate":values.joiningDate,
      "location":values.location
    }
    this.http.post("http://localhost:5555/data",this.dataObj).subscribe(
      (res:Response)=>{
        console.log(res)
      })
    }
    importfile(){
      this.hhide=false;
    }
   
  extractdata(res){
    let csvData =res || "";
    this.papa.parse(csvData,{
      complete:parsedData=>{
          this.headerRow=parsedData.data.splice(0,1)[0];
          this.csvdata=parsedData.data;
          this.csvdetails={
            "id":parsedData.data[0][0],
             "name":parsedData.data[0][1],
             "Position":parsedData.data[0][2],
              "imageURL":parsedData.data[0][3],
              "gender":parsedData.data[0][4],
              "DOB":parsedData.data[0][5],
              "joiningDate":parsedData.data[0][6],
              "location":parsedData.data[0][7]
          }
          this.http.post("http://localhost:5555/data",this.csvdetails).subscribe(
            (res:Response)=>{
              console.log(res)
            }
          )
      }
    })

  }
 
  getFiles(event){
      this.files=event.target.files
    console.log(this.files[0].name);
  }
  send(){
    const url=`${"assets"}/${this.files[0].name}`;
    this.http.get(url,{responseType:'text'}).subscribe(
      data=>this.extractdata(data)
    )
}

    
}
