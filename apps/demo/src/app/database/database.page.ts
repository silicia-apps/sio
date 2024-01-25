import { Component} from '@angular/core';
import { SioCommonModule, SioCoreLoggerService } from '@silicia/core';
import { TaskState } from './store/task.state';
import { taskInterface } from './store/task.interface';
import { Query } from '@silicia/database';

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
    this.taskState.load([Query.limit(100)]);
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
    this.sioCoreLoggerService.debug('[DatabasePageComponent][delete]', event.id);
    this.taskState.removeOne(event.id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  public archive(event: any) {
    this.sioCoreLoggerService.log('you have right swiped ');
  }

  public load(event: Record<string, number | string>) {
    this.sioCoreLoggerService.debug('[DatabasePageComponent][load]', event);
    this.taskState.load();
  }
}
