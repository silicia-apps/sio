
  <div *ngIf="this.received">
    <ion-img (click)="(null)" class="profile-pic left" [src]="this.avatar" onerror="null"/>

    <div class="chat-bubble left slide-left">
      <div class="message" [innerHTML]="this.message" autolinker></div>

      <div class="message-detail">
        <span (click)="(null)" class="bold">{{this.user}}</span>,
        <span>0:00</span>
      </div>
    </div>
  </div>
  <div *ngIf="!this.received">
    <ion-img (click)="(null)" class="profile-pic right" [src]="this.avatar" onerror="null" />

    <div class="chat-bubble right slide-right">
      <div class="message" [innerHTML]="this.message" autolinker></div>

      <div class="message-detail">
        <span (click)="(null)" class="bold">{{this.user}}</span>,
        <span>0:00</span>
      </div>
    </div>
  </div>
  <div class="cf"></div>
