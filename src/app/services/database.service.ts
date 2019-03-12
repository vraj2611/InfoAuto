import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { 

  }
  public getDataBase(){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      
  }
  public createDataBase(){
    this.getDataBase()
    .then((db : SQLiteObject) =>{
      this.createTables(db);
    })
    .catch (e => console.error(e));
    
  }
  
  private createTables(db : SQLiteObject){
    db.sqlBatch([
        ['CREATE TABLE IF NOT EXISTS raca ( id INT NOT NULL, nome VARCHAR(100) NULL, PRIMARY KEY (id));'],
        ['CREATE TABLE IF NOT EXISTS proprietario ( id INT NOT NULL, nome VARCHAR(100) NULL, rua VARCHAR(100) NULL, complemento VARCHAR(45) NULL, bairro VARCHAR(45) NULL, cidade VARCHAR(100) NULL, estado VARCHAR(2) NULL, cep VARCHAR(8) NULL, PRIMARY KEY (id));'],
        ['CREATE TABLE IF NOT EXISTS cachorro (id INT NOT NULL,nome VARCHAR(100) NULL, idade INT NULL, Proprietario_id INT NOT NULL, raca_id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (Proprietario_id) REFERENCES Proprietario (id), FOREIGN KEY (raca_id) REFERENCES raca (id));']
      ]).then(() => {
        console.log("tabelas criadas");
      }).catch (e => console.error(e));
    }

  

}
