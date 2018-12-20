var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');

var db=mongojs('mongodb://HeshamGomaa:h123456@ds032340.mlab.com:32340/mytasklist_hesham',['tasks']);

//get all tasks
router.get('/tasks',function(req,res,next){
    db.tasks.find(function(err,tasks){
        if(err){
        res.send(err);
        }
        res.json(tasks);

    })

});

// get on task
router.get('/task/:id',function(req,res,next){
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
        res.send(err);
        }
        res.json(task);

    })

});

//save task
router.post('/task',function(req,res,next){

    var task=req.body;
    if(!task.title || !(task.isDone+'')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }else{
        db.tasks.save(task,function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);

        });
    }
});

//delete task
router.delete('/task/:id',function(req,res,next){
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
        res.send(err);
        }
        res.json(task);

    })

});

//update Task
router.put('/task/:id',function(req,res,next){
     var task =req.body;
     var updteTask={};
     if(task.title){
        updteTask.title=task.title;
        };
    if(task.isDone){
        updteTask.isDone=task.isDone;     
       };
    if(!updteTask){
      res.status(400);
      res.json({
          "error":"Bad Data"
      });
    }
    else{
        db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updteTask,{},function(err,task){
            if(err){
            res.send(err);
            }
            res.json(task);
    
        })
    }

    

});

//update task


module.exports=router;