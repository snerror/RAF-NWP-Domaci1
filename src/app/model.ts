export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}

export interface EntityExtractionResult {
  timestamp: string,
  lang: string,
  langConfidence: string,
  text: string,
  annotations: EntityExtractionAnnotation[],
}

export interface EntityExtractionAnnotation {
  start: number,
  end: number,
  spot: string,
  confidence: number,
  label: string,
  abstract: string | null,
  categories: string[] | null,
  image: EntityExtractionImage | null,
}

export interface EntityExtractionImage {
  thumbnail: string,
}

export interface TextSimilarityResult {
  lang: string,
  langConfidence: number,
  similarity: number,
  time: string,
}

export interface DetectLanguageResult {
  time: string,
  detectedLangs: DetectedLanguages[]
}

export interface DetectedLanguages {
  lang: string,
  confidence: number,
}

export interface SentimentAnalysisResult {
  time: string,
  lang: string,
  langConfidence: string,
  text: string,
  sentiment: Sentiment,
}

export interface Sentiment {
  score: number,
  type: string,
}

export interface HistoryItem {
  time: string,
  method: string,
  text: string,
}
