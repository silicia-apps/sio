import { SioDatabaseDocumentInterface } from "@silicia/database";
import { SioChatInterface } from "../interfaces/chat.interface";

export interface SioChatComponentStateModel extends SioChatInterface, SioDatabaseDocumentInterface {
  isLoading?: boolean;
  error?: string;
  isConnected?: boolean;
  isTyping?: boolean;
  isRecording?: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  isTranslating?: boolean;
  isTranscribing?: boolean;
  isSummarizing?: boolean;
  isGeneratingImage?: boolean;
  isGeneratingVideo?: boolean;
  isGeneratingAudio?: boolean;
  isGeneratingTextToSpeech?: boolean;
  isGeneratingSpeechToText?: boolean;
}