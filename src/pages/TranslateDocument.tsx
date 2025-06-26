
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image, Check, AlertCircle, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

    if (selectedFile.size > 25 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 25MB.",
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">
              Upload a regional-language legal document
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Translate legal documents to your preferred language with AI precision
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* File Upload Zone */}
            <div
              className={cn(
                "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer",
                isDragOver 
                  ? "border-blue-400 bg-blue-50 scale-[1.02]" 
                  : "border-gray-300 hover:border-gray-400",
                file && "border-green-300 bg-green-50"
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
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleDownload}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Translated File
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-green-200 text-green-700 hover:bg-green-50"
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
            <p className="text-xs text-gray-500 text-center">
              Maximum file size: 25MB. Supported formats: PDF, DOCX, PNG, JPEG
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranslateDocument;
