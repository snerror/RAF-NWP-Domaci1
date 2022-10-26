import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  token: string | null;

  constructor(private configService: ConfigService) {
    this.token = this.configService.getToken();
  }

  ngOnInit(): void {
  }

  setToken() {
    if (!this.token) return
    this.configService.setToken(this.token);
  }

  clearToken() {
    this.configService.clearToken()
    this.token = this.configService.getToken()
  }
}
