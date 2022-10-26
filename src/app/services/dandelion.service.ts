import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DetectLanguageResult, EntityExtractionResult, SentimentAnalysisResult, TextSimilarityResult} from "../model";
import {ConfigService} from "./config.service";
import {HistoryService} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class DandelionService {
  private readonly apiUrl = environment.dandelionApi
  token: string | null

  constructor(private httpClient: HttpClient, private configService: ConfigService, private historyService: HistoryService) {
    this.token = configService.getToken()
    this.configService.tokenUpdated.subscribe((token) => {
      this.token = token
    })
  }

  getEntityExtraction(text: string, minConfidence: number, options: string[] = []): Observable<EntityExtractionResult> {
    const data = {
      text,
      min_confidence: minConfidence,
      include: options.toString(),
      token: this.token,
    }
    // @ts-ignore
    const params = new URLSearchParams(data)
    const url = `${this.apiUrl}/datatxt/nex/v1?${params.toString()}`
    this.historyService.log("GET", url)

    return this.httpClient.get<EntityExtractionResult>(url);
  }

  getTextSimilarity(text1: string, text2: string): Observable<TextSimilarityResult> {
    const data = {
      text1, text2,
      token: this.token,
    }
    // @ts-ignore
    const params = new URLSearchParams(data)
    const url = `${this.apiUrl}/datatxt/sim/v1?${params.toString()}`
    this.historyService.log("GET", url)

    return this.httpClient.get<TextSimilarityResult>(url);
  }

  getDetectLanguage(text: string, clean: boolean | null): Observable<DetectLanguageResult> {
    const data = {
      text,
      clean,
      token: this.token,
    }
    // @ts-ignore
    const params = new URLSearchParams(data)

    const url = `${this.apiUrl}/datatxt/li/v1?${params.toString()}`
    this.historyService.log("GET", url)

    return this.httpClient.get<DetectLanguageResult>(url);
  }

  getSentimentAnalysis(text: string, lang: string | null = null): Observable<SentimentAnalysisResult> {
    const data = {
      text,
      token: this.token,
    }

    // @ts-ignore
    const params = new URLSearchParams(data)
    if (lang) params.append("lang", lang)

    const url = `${this.apiUrl}/datatxt/sent/v1?${params.toString()}`
    this.historyService.log("GET", url)

    return this.httpClient.get<SentimentAnalysisResult>(url);
  }
}
