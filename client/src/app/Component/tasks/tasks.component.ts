import { Component, OnInit } from '@angular/core';
import{ TaskService }from 'src/app/services/task.service'
import {Task} from '../../models/task'
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:Task[];
  title:string;

  constructor(private taskService:TaskService) { 
    this.taskService.getTasks().subscribe(tasks=>{
     debugger;
     var tasksJson=tasks.json();
     this.tasks=tasks.json();
      console.log(tasks.json);
    });
  }

  ngOnInit() {
  }
  addTask(event){
   var newTask={
     title:this.title,
     isDone:false
   }
    this.taskService.addTask(newTask).subscribe(data=>{
      debugger
      this.tasks.push(data.json());
      this.title='';
    })
  };

  deleteTask(taskId){
    var tasks=this.tasks;
  this.taskService.DeleteTask(taskId).subscribe(data=>{
    debugger;
    data=data.json();
    if(data.n==1){
      var index=this.tasks.findIndex(c=>c._id==taskId);
      this.tasks.splice(index, 1);
      debugger;
 
    }


  })
  };

  changStatus(task){
    var _task={
      _id:task._id,
      title:task.title,
      isDone:!task.isDone
    }
   this.taskService.changStatus(_task).subscribe(data=>{
    debugger;
    var task=data.json();
   })
  };
}
