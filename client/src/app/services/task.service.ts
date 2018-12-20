import { Injectable } from '@angular/core';
import{Http,Headers} from '@angular/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpVariable:Http) { 
    console.log('Task Service STarted.......');
  }


  getTasks():Observable<any>{
    return this.httpVariable.get('http://localhost:3000/api/tasks');
  }

  //adding new Task
  addTask(task:any):Observable<any>{
    debugger;
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.httpVariable.post('http://localhost:3000/api/task',JSON.stringify(task),{headers:headers});
  }

  //Delet Task
  DeleteTask(taskId:any):Observable<any>{
    debugger;
    return this.httpVariable.delete('http://localhost:3000/api/task/'+taskId);
  }

  //chang Status
  changStatus(task:any):Observable<any>{
    debugger;
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.httpVariable.put('http://localhost:3000/api/task/'+task._id,JSON.stringify(task),{headers:headers});
  }
  
}
