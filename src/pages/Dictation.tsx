
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Copy, Trash2, Upload, Download, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockCases, mockClients } from "@/data/mockData";

const languages = [
  { code: "en-IN", name: "English - India" },
  { code: "hi-IN", name: "Hindi - India" },
  { code: "bn-IN", name: "Bengali - India" },
  { code: "te-IN", name: "Telugu - India" },
  { code: "mr-IN", name: "Marathi - India" },
  { code: "ta-IN", name: "Tamil - India" },
  { code: "gu-IN", name: "Gujarati - India" },
  { code: "kn-IN", name: "Kannada - India" },
  { code: "ml-IN", name: "Malayalam - India" },
  { code: "pa-IN", name: "Punjabi - India" },
  { code: "or-IN", name: "Odia - India" },
  { code: "as-IN", name: "Assamese - India" },
];

const Dictation = () => {
  const { toast } = useToast();
  
  // Live Dictation State
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-IN");
  const [wordCount, setWordCount] = useState(0);
  
  // Upload Recording State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadLanguage, setUploadLanguage] = useState("en-IN");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [transcriptionResult, setTranscriptionResult] = useState("");
  
  // Save State
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [wantToTag, setWantToTag] = useState<boolean | null>(null);
  const [selectedCase, setSelectedCase] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscriptText(prev => prev + finalTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        toast({
          title: "Recording Error",
          description: "There was an issue with the speech recognition.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [selectedLanguage, toast]);

  // Update word count
  useEffect(() => {
    const words = transcriptText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [transcriptText]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(transcriptText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const clearText = () => {
    setTranscriptText("");
    setWordCount(0);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 25MB.",
          variant: "destructive",
        });
        return;
      }
      
      const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/mpeg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select an MP3 or WAV file.",
          variant: "destructive",
        });
        return;
      }
      
      setUploadFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 25 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 25MB.",
          variant: "destructive",
        });
        return;
      }
      
      const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/mpeg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select an MP3 or WAV file.",
          variant: "destructive",
        });
        return;
      }
      
      setUploadFile(file);
    }
  };

  const transcribeFile = async () => {
    if (!uploadFile) return;
    
    setIsTranscribing(true);
    setTranscriptionProgress(0);
    
    // Simulate transcription progress
    const progressInterval = setInterval(() => {
      setTranscriptionProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 20;
      });
    }, 500);
    
    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setTranscriptionProgress(100);
      setTranscriptionResult("This is a simulated transcription result. In a real implementation, this would be the actual transcribed text from your audio file using a speech-to-text service.");
      setIsTranscribing(false);
      toast({
        title: "Transcription Complete",
        description: "Your audio has been successfully transcribed.",
      });
    }, 3000);
  };

  const downloadTranscription = () => {
    const element = document.createElement("a");
    const file = new Blob([transcriptionResult], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "transcription.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSave = (textToSave: string) => {
    if (!textToSave.trim()) {
      toast({
        title: "Nothing to Save",
        description: "Please add some content before saving.",
        variant: "destructive",
      });
      return;
    }
    setShowSaveDialog(true);
    setWantToTag(null);
    setSelectedCase("");
    setSelectedClient("");
  };

  const handleSaveSubmit = () => {
    const saveData = {
      text: transcriptText || transcriptionResult,
      timestamp: new Date().toISOString(),
      case: selectedCase ? mockCases.find(c => c.id === selectedCase) : null,
      client: selectedClient ? mockClients.find(c => c.id === selectedClient) : null,
    };
    
    console.log('Saving dictation:', saveData);
    
    toast({
      title: "Dictation Saved",
      description: wantToTag 
        ? `Saved and tagged to ${selectedCase ? 'case' : 'client'}.`
        : "Dictation saved successfully.",
    });
    
    setShowSaveDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dictation & Audio Transcription
          </h1>
          <p className="text-gray-600">
            Convert speech to text in real-time or upload audio files for transcription
          </p>
        </div>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="live" className="text-base">Live Dictation</TabsTrigger>
            <TabsTrigger value="upload" className="text-base">Upload Recording</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Live Dictation
                  <Badge variant="secondary" className="text-sm">
                    {wordCount} words
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    size="lg"
                    onClick={toggleRecording}
                    className={cn(
                      "w-16 h-16 rounded-full transition-all duration-200",
                      isRecording 
                        ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                        : "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    {isRecording ? (
                      <Square className="h-6 w-6 text-white" />
                    ) : (
                      <Mic className="h-6 w-6 text-white" />
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <Textarea
                    value={transcriptText}
                    onChange={(e) => setTranscriptText(e.target.value)}
                    placeholder="Click the microphone button to start dictating..."
                    className="min-h-64 font-mono text-sm resize-none"
                    style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
                  />
                  {isRecording && (
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-2 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        Recording...
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={copyText}
                    disabled={!transcriptText.trim()}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Text
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSave(transcriptText)}
                    disabled={!transcriptText.trim()}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearText}
                    disabled={!transcriptText.trim()}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Recording</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Select value={uploadLanguage} onValueChange={setUploadLanguage}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {uploadFile ? (
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {uploadFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Drop your audio file here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Or click to select a file
                      </p>
                      <p className="text-xs text-gray-400">
                        Supports MP3, WAV files up to 25MB
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp3,.wav,audio/mp3,audio/wav,audio/mpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <Button
                  onClick={transcribeFile}
                  disabled={!uploadFile || isTranscribing}
                  className="w-full"
                  size="lg"
                >
                  {isTranscribing ? "Transcribing..." : "Transcribe Audio"}
                </Button>

                {isTranscribing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Transcribing...</span>
                      <span>{Math.round(transcriptionProgress)}%</span>
                    </div>
                    <Progress value={transcriptionProgress} className="h-2" />
                  </div>
                )}

                {transcriptionResult && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <CardTitle className="text-lg">Transcription Result</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadTranscription}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download .txt
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-md">
                        <p className="text-sm font-mono leading-relaxed">
                          {transcriptionResult}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => handleSave(transcriptionResult)}
                          className="flex items-center gap-2"
                        >
                          <Save className="h-4 w-4" />
                          Save Transcription
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Dialog */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Save Dictation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {wantToTag === null && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Do you want to tag this dictation to any case or client?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      onClick={() => setWantToTag(true)}
                      className="flex-1"
                    >
                      Yes, Tag It
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setWantToTag(false)}
                      className="flex-1"
                    >
                      No, Just Save
                    </Button>
                  </div>
                </div>
              )}

              {wantToTag === true && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Case</label>
                    <Select value={selectedCase} onValueChange={setSelectedCase}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a case (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCases.map((case_) => (
                          <SelectItem key={case_.id} value={case_.id}>
                            {case_.name} - {case_.clientName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Client</label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a client (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} - {client.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setWantToTag(null)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSaveSubmit}
                      className="flex-1"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              )}

              {wantToTag === false && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Save dictation without tagging to any case or client?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setWantToTag(null)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSaveSubmit}
                      className="flex-1"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dictation;
