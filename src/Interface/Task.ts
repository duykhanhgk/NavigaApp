class Task {

    id: Number;
    taskName : String ;
    projectId: Number;
    projectName : String;
    description : String;
    startDate : String;
    dueDate : String;
    status : Number;

    
    constructor(
        id: Number,
        taskName : String ,
        projectId: Number,
        projectName : String,
        description : String,
        startDate : String,
        dueDate : String,
        status : Number,
        ) {
            this.id = id;
            this.taskName = taskName ;
            this.projectId = projectId;
            this.projectName = projectName;
            this.description = description;
            this.startDate = startDate;
            this.dueDate = dueDate;
            this.status = status;
        }
}

export default Task ;