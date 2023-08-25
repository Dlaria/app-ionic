import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  currentDate: string;
  myTask = "";
  addTask = false;
  tasks: any;

  constructor(public afDB: AngularFireDatabase) {
    const timeformat: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false
    };

    this.currentDate = new Date().toLocaleTimeString('fr-FR', timeformat);
    this.getTasks();
  }

  // Fonction d'affichage du formulaire
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  // Fonction d'ajout de tâche a la base de donnée
  addTaskToFirebase () {
    this.afDB.list('Task/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false
    });
    this.showForm();
  }

  // Fonction de récupération des tâches en base de données
  getTasks() {
    this.afDB.list('Task/').snapshotChanges().subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked
        });
      });
    });
  }

  // Fonction du changement de status d'une tâche
  changeCheckState(ev: any){
    this.afDB.object('Task/' + ev.key + '/checked/').set(ev.checked);
  }

  // Fonction de suppression d'une tâche
  deleteTask(task: any) {
    this.afDB.list('Task/').remove(task.key)
  }
}
