import {Component} from '@angular/core';
import {SentimentAnalysisResult} from "../../model";
import {DandelionService} from "../../services/dandelion.service";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
})
export class SentimentAnalysisComponent {
  text: string = "We have iphone but we can't use memoji with this board. There isn't in emoji menu. Please fix."
  lang: string | null = null
  result: SentimentAnalysisResult | null = null
  errorMessage: string = ""

  constructor(private dandelionService: DandelionService) {
  }

  isButtonDisabled() {
    return this.text === "";
  }

  lerp(start: number, end: number, alpha: number) {
    return start + (end - start) * alpha;
  }

  normalize(min: number, max: number, value: number) {
    return (value - min) / (max - min)
  }

  colorInterpolation(t: number): string {
    const colorA = {
      r: 255,
      g: 0,
      b: 0,
    }
    const colorB = {
      r: 0,
      g: 255,
      b: 0,
    }

    console.log(this.normalize(-1, 1, t))
    t = this.normalize(-1, 1, t)

    let newRed = this.lerp(colorA.r, colorB.r, t)
    let newGreen = this.lerp(colorA.g, colorB.g, t)
    let newBlue = this.lerp(colorA.b, colorB.b, t)

    return `rgb(${newRed}, ${newGreen}, ${newBlue})`
  }

  submit() {
    this.dandelionService.getSentimentAnalysis(this.text, this.lang).subscribe(response => {
      this.result = response
    }, error => {
      this.errorMessage = error.statusText
    })
  }
}
