import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../../models/player';
import { Sport } from '../../../models/sport';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  picFile!: File;
  player: Player = new Player();
  playerForm: FormGroup = new FormGroup({
    playerName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    playerCategory: new FormControl('', [Validators.required]),
    joinDate: new FormControl(undefined, [Validators.required]),
    gender: new FormControl('Male', [Validators.required]),
    picture: new FormControl(undefined, [Validators.required]),
    sportId: new FormControl('', [Validators.required])
  });
  sports: Sport[] = [];
  get f() {
    return this.playerForm.controls;
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  update(): void {
    if (this.playerForm.invalid) return;
    console.log(this.playerForm.value);

    Object.assign(this.player, this.playerForm.value);
    console.log(this.player);
    this.player.picture = 'no-pic.jpg';
    this.player.playerName = this.f.playerName.value;
    this.player.playerCategory = this.f.playerCategory.value;
    this.player.joinDate = this.f.joinDate.value;
    this.player.joinDate = new Date(<string>this.datePipe.transform(this.player.joinDate, "yyyy-MM-dd"));
    this.player.gender = this.f.gender.value;
    this.player.sportId = this.f.sportId.value;
    this.dataSvc.putPlayer(this.player)
      .subscribe(a => {
        if (this.picFile != null && this.player.playerId) {
          this.upload(Number(this.player.playerId))
        }
        else {
          this.notifySvc.success("Updated to save player data", "DISMISS");
        }
      }, err => {
        this.notifySvc.fail("Failed to update player data.", "DISMISS");
      })
  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.dataSvc.upload(id, this.picFile)
        .subscribe(r => {
          this.player.picture = r.imagePath;
          this.notifySvc.success("Player data saved successfully!!", "DISMISS");
          this.playerForm.reset({});
        }, err => {
          this.notifySvc.fail("Failed to upload Image.", "DISMISS");
        })
    })
    reader.readAsDataURL(this.picFile);
  }
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params.id;
    this.dataSvc.getPlayerById(id)
      .subscribe(r => {
        this.player = r;
        this.playerForm.patchValue(this.player);
      }, err => {
        this.notifySvc.fail("Fail to load animal data", "DISMISS");
      });
    this.dataSvc.getSports()
      .subscribe(r => {
        this.sports = r;
      }, err => {
        this.notifySvc.fail("Fail to load sport data", "DISMISS");
      });
  }

}
