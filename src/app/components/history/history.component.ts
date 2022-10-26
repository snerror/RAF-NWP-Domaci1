import {Component} from '@angular/core';
import {HistoryService} from "../../services/history.service";
import {HistoryItem} from "../../model";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  history: HistoryItem[] = []

  constructor(private historyService: HistoryService) {
    this.history = historyService.getHistory()
  }
}
