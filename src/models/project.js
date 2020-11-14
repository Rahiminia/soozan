const db = require('../helpers/db')

const INTER_QUERY="insert into project_user(project_id, user_id) values (?, ?);"
const INSERT_QUERY="insert into project(name) values (?);"
const GET_PROJ_QUERY = `SELECT p.* FROM
project_user pu, project p WHERE
pu.project_id = p.id AND
pu.user_id = ?`;

class ProjectModel{
  constructor(name){
    this.name=name
  }

  save(userId){
    return new Promise((resolve, reject)=>{
      db.query(INSERT_QUERY,
      [this.name], (err,res)=>{
        if(err)
          reject(err)
        db.query(INTER_QUERY,
        [res.insertId, userId], (err,res)=>{
          if(err)
            reject(err)
          resolve(res)
        })
      })
    });
  }

  static getProjects(userId){
    return new Promise((resolve, reject)=>{
      db.query(GET_PROJ_QUERY,[userId], (err,res)=>{
        if(err)
          reject(err)
        resolve(res)
      })
    })
  }
}

module.exports=ProjectModel
