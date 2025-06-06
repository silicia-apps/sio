import { SioDatabaseDocumentInterface } from "@silicia/database";
import { SioChatMessageInterface } from "../../../interfaces";

export interface SioChatMessageStateModel extends SioChatMessageInterface, SioDatabaseDocumentInterface {
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