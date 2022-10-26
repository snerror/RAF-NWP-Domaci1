import {Component} from '@angular/core';
import {TextSimilarityResult} from "../../model";
import {DandelionService} from "../../services/dandelion.service";

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
})
export class TextSimilarityComponent {
  text1: string = "Reports that the NSA eavesdropped on world leaders have \"severely shaken\" relations between Europe and the U.S., German Chancellor Angela Merkel said."
  text2: string = "Germany and France are to seek talks with the US to settle a row over spying, as espionage claims continue to overshadow an EU summit in Brussels."
  result: TextSimilarityResult | null = null
  errorMessage: string = ""

  constructor(private dandelionService: DandelionService) {
  }

  isButtonDisabled() {
    return this.text1 === "" || this.text2 === "";
  }


  submit() {
    this.dandelionService.getTextSimilarity(this.text1, this.text2).subscribe(response => {
      console.log(response)
      this.result = response
    }, error => {
      this.errorMessage = error.statusText
    })
  }
}
