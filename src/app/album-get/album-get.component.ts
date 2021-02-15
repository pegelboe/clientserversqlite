import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-get',
  templateUrl: './album-get.component.html',
  styleUrls: ['./album-get.component.scss']
})
export class AlbumGetComponent implements OnInit, OnDestroy {

  public album = undefined;
  public albumList: Album[] = undefined;
  public error: string = "-";
  public artistName: string = "Queen";

  private subscrAlbum: Subscription = undefined;
  private subscrAlbumList: Subscription = undefined;

  constructor(private ps: AlbumService) { }

  ngOnInit(): void {

    this.subscrAlbum = this.ps.getGreatestAlbum().subscribe(
      (data: Album) => {
        this.resetError();
        this.album = data;
      },
      (err) => {
        this.error = err.message;
        console.log("Album Error");
      }
    );

    this.getAlbumsFromServer(this.artistName);
  }

  public requestAlbums() {
    this.albumList = [];
    this.getAlbumsFromServer(this.artistName);
  }

  private getAlbumsFromServer(artName: string) {
    this.subscrAlbumList = this.ps.getAlbumList(artName).subscribe(
      (data: Album[]) => {
        this.resetError();
        this.albumList = [];

        for(let dat of data) {
          let alb: Album = new Album(dat);
          this.albumList.push(alb);
        }
      },
      (err) => {
        this.error = err.message;
        console.log("Album list Error");
      }
    );
  }

  private resetError() {
    this.error = "-";
  }

  ngOnDestroy(): void {
    if(this.subscrAlbum != undefined)
      this.subscrAlbum.unsubscribe();
    if(this.subscrAlbumList != undefined)
      this.subscrAlbumList.unsubscribe();
  }

}
