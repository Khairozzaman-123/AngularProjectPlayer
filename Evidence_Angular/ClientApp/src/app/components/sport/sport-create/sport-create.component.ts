import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sport } from '../../../models/sport';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-sport-create',
  templateUrl: './sport-create.component.html',
  styleUrls: ['./sport-create.component.css']
})
export class SportCreateComponent implements OnInit {
  sport: Sport = new Sport();
  sportForm: FormGroup = new FormGroup({
    sportName: new FormControl('', Validators.required),
    popularity: new FormControl('', Validators.required)
  });

  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService) { }

  get f() {
    return this.sportForm.controls;
  }
  insert() {
    if (this.sportForm.invalid) return;
    this.sport.sportName = this.f.sportName.value;
    this.sport.popularity = this.f.popularity.value;
    this.dataSvc.postSport(this.sport)
      .subscribe(r => {
        this.notifySvc.success("Data Inserted successfully!!", "DISMISS");
        this.sportForm.reset({});
        console.log(r);
      }, err => {
        this.notifySvc.fail("Failed to save data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
  }

}
