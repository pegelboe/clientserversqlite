import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.scss']
})
export class AlbumAddComponent implements OnInit {

  resultMessage: string = undefined;

  constructor(private albumService: AlbumService) {
  }

  addAlbum(ArtistName: string, AlbumTitle: string) {
    this.resultMessage = undefined;
    let album: Album = new Album();
    album.ArtistName = ArtistName;
    album.Title = AlbumTitle;

    this.albumService.addAlbum(album, 
      suc => {
        this.resultMessage = suc;
      },
      err => {
        this.resultMessage = err;
      }
    );
  }

  ngOnInit() {
  }

}
