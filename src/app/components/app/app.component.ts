import {Component} from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token: string | null

  constructor(private configService: ConfigService) {
    this.token = configService.getToken()
    this.configService.tokenUpdated.subscribe((token) => {
      this.token = token
    })
  }

  getUserName() {
    return this.configService.getToken();
  }
}
