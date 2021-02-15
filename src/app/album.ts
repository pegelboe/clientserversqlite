export class Album {

  public Title: string;
  public ArtistName: string;

  constructor(jsonData?: any) {
    Object.assign(this, jsonData);
  }

  public getAll(): string {
    return `'${this.Title}' performed by ${this.ArtistName}`;
  }
}