const ProjectModel = require('../models/project')

class ProjectController{
  static addProject(data){
    const newProject = new ProjectModel(data.name)
    return newProject.save(data.userId)
  }

  static getProjects(userId){
    return ProjectModel.getProjects(userId)
  }
}

module.exports=ProjectController
