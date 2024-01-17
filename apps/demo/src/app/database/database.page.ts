import { Component } from '@angular/core';
import { SioCommonModule, SioCoreLoggerService } from '@silicia/core';
import { TaskState } from './store/task.state';
import { taskInterface } from './store/task.interface';

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
    const test: taskInterface = {
      name : 'test',
      description : 'test descrption'
    }
    this.taskState.addOne(test);
    const task = {...this.taskState.selectOne('65a841c4577a8c033b25')!}
    task.name = 'task ciao';
    this.taskState.setOne(task);
  }
  public deleteAll() {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public delete(event: any) {
    console.error (JSON.stringify(event));
    //this.taskState.removeByEntity()
  }
}
