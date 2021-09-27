import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sport } from '../../../models/sport';
import { DataService } from '../../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-sport-view',
  templateUrl: './sport-view.component.html',
  styleUrls: ['./sport-view.component.css']
})
export class SportViewComponent implements OnInit {
  sports: Sport[] = [];
  dataSource: MatTableDataSource<Sport> = new MatTableDataSource(this.sports);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["name", "popularity", "actions"]

  constructor(
    private dataSvc: DataService,
    private dialog: MatDialog,
    private notifySvc: NotifyService

  ) { }

  ngOnInit(): void {
    this.dataSvc.getSports().subscribe(x => {
      this.sports = x;
      console.log(x);
      this.dataSource.data = this.sports;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  confirmDelete(item: Sport) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteSport(Number(item.sportId))
        .subscribe(x => {
          this.notifySvc.success("Data Deleted successfully!!", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.sportId != x.sportId);
        }, err => {
          this.notifySvc.fail("Data delete failed!!!", "DISMISS");
        });
    })
  }

}
