import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../../../models/player';
import { Sport } from '../../../models/sport';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit {
  players: Player[] = [];
  sports: Sport[] = [];
  dataSource: MatTableDataSource<Player> = new MatTableDataSource(this.players);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["picture", "name", "category", "joinDate", "gender", "sport", "actions"]

  constructor(
    private dataSvc: DataService,
    private dialog: MatDialog,
    private notifySvc: NotifyService

  ) { }
  confirmDelete(item: Player) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deletePlayer(Number(item.playerId))
        .subscribe(x => {
          this.notifySvc.success("Data Deleted successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.playerId != x.playerId);
        }, err => {
          this.notifySvc.fail("Data delete failed!!!", "DISMISS");
        });
    })
  }
  getSportName(id: number) {
    let z = this.sports.find(z => z.sportId == id);
    return z ? z.sportName : '';
  }
  ngOnInit(): void {
    this.dataSvc.getPlayes()
      .subscribe(r => {
        this.players = r;
        this.dataSource.data = this.players;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {

      });
    this.dataSvc.getSports()
      .subscribe(x => {
        this.sports = x;
      })
  }

}
