import { Component } from '@angular/core';
import { SioCommonModule, SioCoreLoggerService } from '@silicia/core';
import { TaskState } from './task.state';
import { taskInterface } from './task.interface';


@Component({
  selector: 'sio-database',
  templateUrl: 'database.page.html',
  styleUrls: ['database.page.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class DatabasePageComponent {
  constructor(
    public taskState: TaskState,
    private sioCoreLoggerService: SioCoreLoggerService,
  ) {
    this.taskState.setDatabaseId('demo');
    this.taskState.setCollectionId('tasks');
    this.taskState.load();
  }

  public async create() {
    const test = {
      $id : 'ijijiiij',
      $collectionId : '',
      $createdAt : '',
      $databaseId : '',
      $updatedAt : '',
      name : 'test',
      $permissions : [],
      description : 'test descrption'
    }
    this.taskState.addOne(test);
    const task = {...this.taskState.selectOne('65a29bfd53f6ff5f0af8')}
    task.name = 'task ciao';
    this.taskState.setOne(<taskInterface>task);
  }
  public deleteAll() {
    
  }
}
