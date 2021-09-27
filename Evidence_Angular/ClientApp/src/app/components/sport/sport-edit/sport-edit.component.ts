import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Sport } from '../../../models/sport';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-sport-edit',
  templateUrl: './sport-edit.component.html',
  styleUrls: ['./sport-edit.component.css']
})
export class SportEditComponent implements OnInit {

  sport!: Sport;
  sportForm: FormGroup = new FormGroup({
    sportName: new FormControl('', Validators.required),
    popularity: new FormControl('', Validators.required)
  });
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private activatedRoute: ActivatedRoute) { }
  get f() {
    return this.sportForm.controls;
  }
  update() {
    if (this.sportForm.invalid) return;
    this.sport.sportName = this.f.sportName.value;
    this.sport.popularity = this.f.popularity.value;
    this.dataSvc.putSport(this.sport)
      .subscribe(r => {
        this.notifySvc.success("Data Updated successfully!!", "DISMISS");

      }, err => {
        this.notifySvc.fail("Failed to update data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.dataSvc.getSportById(id)
      .subscribe(x => {
        this.sport = x;
        this.sportForm.patchValue(this.sport);
      }, err => {
        this.notifySvc.fail("Failed to load sport data!!", "DISMISS");
      })
  }

}
