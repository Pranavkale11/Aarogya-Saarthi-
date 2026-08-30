export class VoiceService {
  constructor(language = 'en-IN') {
    this.language = language;
    this.isListening = false;
    this.recognition = null;
    this.initializeRecognition();
  }

  initializeRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported');
      return;
    }
    
    this.recognition = new SpeechRecognition();
    this.recognition.language = this.language;
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
  }

  startListening(onResult, onError) {
    if (!this.recognition) {
      onError('Speech Recognition not supported');
      return;
    }

    this.isListening = true;

    this.recognition.onstart = () => {
      console.log('Listening started');
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          onResult(transcript);
        } else {
          interimTranscript += transcript + ' ';
        }
      }
    };

    this.recognition.onerror = (event) => {
      onError(`Error: ${event.error}`);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      console.log('Listening ended');
    };

    this.recognition.start();
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text, onEnd) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.language = this.language;
    utterance.rate = 0.9; // Slower speech for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = onEnd;

    window.speechSynthesis.speak(utterance);
  }

  setLanguage(language) {
    this.language = language;
    if (this.recognition) {
      this.recognition.language = language;
    }
  }
}
