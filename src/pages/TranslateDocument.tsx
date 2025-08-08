
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image, Check, AlertCircle, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockCases, mockClients } from "@/data/mockData";
const acceptedFileTypes = [
  { type: 'application/pdf', extension: 'PDF', icon: FileText },
  { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'DOCX', icon: FileText },
  { type: 'image/png', extension: 'PNG', icon: Image },
  { type: 'image/jpeg', extension: 'JPEG', icon: Image },
];

const targetLanguages = [
  { code: 'en', name: 'English (EN)', nativeName: 'English' },
  { code: 'hi', name: 'Hindi (HI)', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali (BN)', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu (TE)', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi (MR)', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil (TA)', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati (GU)', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada (KN)', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam (ML)', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi (PA)', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia (OR)', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese (AS)', nativeName: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu (UR)', nativeName: 'اردو' },
  { code: 'sa', name: 'Sanskrit (SA)', nativeName: 'संस्कृतम्' },
];

type TranslationState = 'idle' | 'uploading' | 'translating' | 'success' | 'error';

const TranslateDocument = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [state, setState] = useState<TranslationState>('idle');
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [translatedFileName, setTranslatedFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  // Attach dialog state
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const [attachType, setAttachType] = useState<'case' | 'client'>('case');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');
  const [selectedClientId, setSelectedClientId] = useState<string>('');

  useEffect(() => {
    document.title = 'AI Document Translation | Legal Translator';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Translate legal documents and handwritten images with AI. Images up to 20MB; PDFs/DOCX up to 25MB.');
    }
  }, []);

  const isValidFileType = (file: File) => {
    return acceptedFileTypes.some(type => type.type === file.type);
  };

  const handleFileSelect = (selectedFile: File) => {
    if (!isValidFileType(selectedFile)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a PDF, DOCX, PNG, or JPEG file.",
        variant: "destructive",
      });
      return;
    }

    const isImage = selectedFile.type.startsWith('image/');
    const maxSize = isImage ? 20 * 1024 * 1024 : 25 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      toast({
        title: "File Too Large",
        description: isImage ? "Images can be up to 20MB." : "Documents can be up to 25MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setState('idle');
    setError('');
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleTranslate = async () => {
    if (!file) return;

    setState('translating');
    setProgress(0);

    // Simulate translation progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      
      // Simulate random success/error
      if (Math.random() > 0.2) {
        setProgress(100);
        setState('success');
        const fileExt = file.name.split('.').pop();
        setTranslatedFileName(`${file.name.replace(`.${fileExt}`, '')}_translated.${fileExt}`);
        toast({
          title: "Translation Complete",
          description: "Your document has been successfully translated.",
        });
      } else {
        setState('error');
        setError('Translation failed. Please check your file and try again.');
        toast({
          title: "Translation Failed",
          description: "There was an error processing your document.",
          variant: "destructive",
        });
      }
    }, 3000);
  };

  const handleRetry = () => {
    setState('idle');
    setError('');
    setProgress(0);
  };

  const handleDownload = () => {
    // Simulate file download
    toast({
      title: "Download Started",
      description: "Your translated document is being downloaded.",
    });
  };

  const handleReset = () => {
    setFile(null);
    setState('idle');
    setProgress(0);
    setError('');
    setTranslatedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAttachSubmit = () => {
    const attachedTo =
      attachType === 'case'
        ? mockCases.find(c => c.id === selectedCaseId)?.name
        : mockClients.find(c => c.id === selectedClientId)?.name;

    toast({
      title: "Attached",
      description:
        attachType === 'case'
          ? `Translated document attached to case: ${attachedTo || ''}`
          : `Translated document attached to client: ${attachedTo || ''}`,
    });

    setIsAttachOpen(false);
    setSelectedCaseId('');
    setSelectedClientId('');
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6 text-center fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            AI Document Translation
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Upload legal documents or images (handwritten supported) and translate to your preferred language.
          </p>
        </header>
        <Card className="shadow-sm border bg-card">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold text-foreground mb-1">
              Upload a document or image
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Images up to 20MB • PDFs/DOCX up to 25MB
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* File Upload Zone */}
            <div
              className={cn(
                "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer hover-scale",
                isDragOver 
                  ? "border-ring bg-accent/40 scale-[1.02]" 
                  : "border-border hover:border-ring",
                file && "border-primary/40 bg-primary/5"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.png,.jpeg,.jpg"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              <div className="space-y-4">
                {file ? (
                  <div className="flex items-center justify-center space-x-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-1">
                        Drop your document here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Or click to browse files
                      </p>
                    </div>
                  </>
                )}
                
                <div className="flex flex-wrap justify-center gap-2">
                  {acceptedFileTypes.map(({ extension, icon: Icon }) => (
                    <Badge key={extension} variant="secondary" className="text-xs">
                      <Icon className="h-3 w-3 mr-1" />
                      {extension}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Target Language
              </label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  {targetLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center space-x-2">
                        <span>{lang.name}</span>
                        <span className="text-gray-500 text-xs">{lang.nativeName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Error State */}
            {state === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 text-sm font-medium">{error}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Retry
                </Button>
              </div>
            )}

            {/* Progress Bar */}
            {(state === 'translating' || state === 'success') && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {state === 'translating' ? 'Translating document...' : 'Translation complete'}
                  </span>
                  <span className="text-gray-500">{Math.round(progress)}%</span>
                </div>
                <Progress 
                  value={progress} 
                  className={cn(
                    "h-2 transition-all duration-300",
                    state === 'success' && "bg-green-100"
                  )}
                />
              </div>
            )}

            {/* Success State */}
            {state === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-green-900">Translation Successful</p>
                    <p className="text-sm text-green-700">{translatedFileName}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleDownload}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Translated File
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setIsAttachOpen(true)}
                  >
                    Attach to Case/Client
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    Translate Another
                  </Button>
                </div>
              </div>
            )}

            {/* Translate Button */}
            {state !== 'success' && (
              <Button
                onClick={handleTranslate}
                disabled={!file || state === 'translating'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
                size="lg"
              >
                {state === 'translating' ? 'Translating...' : 'Translate Document'}
              </Button>
            )}

            {/* File size limit note */}
            <p className="text-xs text-muted-foreground text-center">
              Images up to 20MB (handwritten supported). Documents (PDF, DOCX) up to 25MB. Supported formats: PDF, DOCX, PNG, JPEG.
            </p>
          </CardContent>
        </Card>

        {/* Attach Dialog */}
        <Dialog open={isAttachOpen} onOpenChange={setIsAttachOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Attach to Case or Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <RadioGroup
                value={attachType}
                onValueChange={(v) => setAttachType(v as 'case' | 'client')}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="case" id="attach-case" />
                  <Label htmlFor="attach-case">Case</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="client" id="attach-client" />
                  <Label htmlFor="attach-client">Client</Label>
                </div>
              </RadioGroup>

              {attachType === 'case' ? (
                <Select value={selectedCaseId} onValueChange={setSelectedCaseId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a case" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCases.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} — {c.clientName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAttachOpen(false)}>Cancel</Button>
              <Button
                onClick={handleAttachSubmit}
                disabled={(attachType === 'case' && !selectedCaseId) || (attachType === 'client' && !selectedClientId)}
              >
                Attach
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TranslateDocument;
