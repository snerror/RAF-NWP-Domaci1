import {Component} from '@angular/core';
import {DetectLanguageResult} from "../../model";
import {DandelionService} from "../../services/dandelion.service";

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
})
export class LanguageDetectionComponent {
  text: string = "Reports that the NSA eavesdropped on world leaders have \"severely shaken\" relations between Europe and the U.S., German Chancellor Angela Merkel said."
  clean: boolean = false
  result: DetectLanguageResult | null = null
  errorMessage: string = ""

  constructor(private dandelionService: DandelionService) {
  }

  isButtonDisabled() {
    return this.text === "";
  }

  submit() {
    this.dandelionService.getDetectLanguage(this.text, this.clean).subscribe(response => {
      this.result = response
    }, error => {
      this.errorMessage = error.statusText
    })
  }
}
