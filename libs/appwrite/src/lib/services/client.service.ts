import { Injectable } from "@angular/core";
import { Client } from "appwrite";

@Injectable()
export class SioAppwriteClientService
{
  private readonly _client: Client;
  
  constructor() {
    this._client = new Client();
  }

  Connect(endpoint: string, projectid: string) {
    
    this._client
        .setEndpoint(endpoint || '')
        .setProject(projectid || '');
  }

  public get client(): Client {
    return this._client;
  }

}