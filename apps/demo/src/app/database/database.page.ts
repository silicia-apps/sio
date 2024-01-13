import { Component } from '@angular/core';
import { SioCommonModule, SioCoreLoggerService } from '@silicia/core';
import { TaskState } from './task.state';


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

  public create() {
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
  }
  public deleteAll() {
    
  }
}
