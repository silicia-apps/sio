import { Component} from '@angular/core';
import { SioCommonModule, SioCoreLoggerService } from '@silicia/core';
import { TaskState } from './store/task.state';
import { taskInterface } from './store/task.interface';
import { SioDatabaseService, SioDatabaseModule } from '@silicia/database';

@Component({
    selector: 'sio-database',
    templateUrl: 'database.page.html',
    styleUrls: ['database.page.scss'],
    imports: [SioCommonModule, SioDatabaseModule]
})
export class DatabasePageComponent {
  constructor(
    public taskState: TaskState,
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioDatabaseService: SioDatabaseService,
  ) {
    this.taskState.setDatabaseId('demo');
    this.taskState.setCollectionId('tasks');
    this.taskState.load([this.sioDatabaseService.limit(25)]);
  }

  public async create() {
    const test: taskInterface = {
      name : 'test',
      description : 'test descrption'
    }
    this.taskState.addOne(test);
    const task = {...this.taskState.selectOne('65a841c4577a8c033b25')}
    task.name = 'task ciao';
    //this.taskState.setOne(task);
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public delete(event: any) {
    this.sioCoreLoggerService.debug('[DatabasePageComponent][delete]', event.id);
    this.taskState.removeOne(event.id);
  }

  public archive(event: Event) {
    this.sioCoreLoggerService.log('you have right swiped ', event);
  }

  public load(event: Event):void {
    this.sioCoreLoggerService.debug('[DatabasePageComponent][load]', event);
  }

  public refresh(event: Event): void {
    this.sioCoreLoggerService.debug('[DatabasePageComponent][refresh]', event);
  }
}
