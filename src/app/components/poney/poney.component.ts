import { RaceService } from './../../services/race.service';
import { Component, OnInit, Input } from '@angular/core';
import Poney from '../../interfaces/poney.interface';

@Component({
  selector: 'app-poney',
  templateUrl: './poney.component.html',
  styleUrls: ['./poney.component.scss']
})
export class PoneyComponent implements OnInit {

  constructor(private raceService: RaceService) { }

  @Input() poneyId: number;
  poneyData: Poney
  isDashing: boolean = false

  ngOnInit() {
    this.poneyData = this.raceService.ponies.find(poney => {
      return poney.id === this.poneyId
    })
  }

  toggleDash() {
    this.isDashing = true
    setTimeout(() => {
      this.isDashing = false
    }, 1000)
  }

  dash() {
    let isRacing = this.raceService.races.find(race => {
      return race.isRacing && typeof race.ponies.find(poneyId => {
        return poneyId == this.poneyId
      }) != "undefined"
    })

    if (isRacing) {
      this.poneyData.distance += 10;
      this.toggleDash()
    }
  }
}
