import {Injectable} from "@angular/core";
import {HistoryItem} from "../model";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  history: HistoryItem[] = []

  log(method: string, text: string) {
    this.history.push({
      time: moment().format('DD.MM.YY h:mm:ss'),
      method: method,
      text: text,
    })
  }

  getHistory() {
    return this.history
  }
}
