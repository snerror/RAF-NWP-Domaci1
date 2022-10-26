import {Component} from '@angular/core';
import {EntityExtractionResult} from "../../model";
import {DandelionService} from "../../services/dandelion.service";

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent {
  text: string = "The Mona Lisa is a sixteenth century oil painting created by Leonardo. It's held at the Louvre in Paris."
  minConfidence: number = 0.5
  options: string[] = []
  result: EntityExtractionResult | null = null
  errorMessage: string = ""

  constructor(private dandelionService: DandelionService) {
  }

  isButtonDisabled() {
    if (!this.text || this.text === "") return true;
    return false;
  }

  onIncludesClick(option: string) {
    if (this.options.includes(option)) {
      const index = this.options.indexOf(option)
      this.options.splice(index, 1);
    } else {
      this.options.push(option)
    }
  }

  submitEntityExtraction() {
    this.dandelionService.getEntityExtraction(this.text, this.minConfidence, this.options).subscribe(response => {
      this.result = response
    }, error => {
      this.errorMessage = error.statusText
    })
  }
}
