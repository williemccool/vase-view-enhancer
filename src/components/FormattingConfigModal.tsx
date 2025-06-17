
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormattingConfig {
  id: string;
  name: string;
  is_default: boolean;
  config: {
    font: {
      family: string;
      size: number;
      color: string;
    };
    spacing: {
      line_spacing: number;
      paragraph_spacing_after: number;
    };
    margins: {
      top: number;
      bottom: number;
      left: number;
      right: number;
      unit: string;
    };
    page_setup: {
      orientation: string;
      paper_size: string;
    };
    indentation: {
      first_line: number;
    };
    headers_footers: {
      include_page_numbers: boolean;
      page_number_position: string;
    };
  };
}

interface FormattingConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: Omit<FormattingConfig, 'id'>) => void;
  initialData?: FormattingConfig | null;
}

const FormattingConfigModal = ({ isOpen, onClose, onSave, initialData }: FormattingConfigModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    is_default: false,
    config: {
      font: {
        family: "Times New Roman",
        size: 12,
        color: "#000000"
      },
      spacing: {
        line_spacing: 2.0,
        paragraph_spacing_after: 6
      },
      margins: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        unit: "inches"
      },
      page_setup: {
        orientation: "Portrait",
        paper_size: "Letter"
      },
      indentation: {
        first_line: 0.5
      },
      headers_footers: {
        include_page_numbers: true,
        page_number_position: "Bottom Center"
      }
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        is_default: initialData.is_default,
        config: { ...initialData.config }
      });
    } else {
      setFormData({
        name: "",
        is_default: false,
        config: {
          font: {
            family: "Times New Roman",
            size: 12,
            color: "#000000"
          },
          spacing: {
            line_spacing: 2.0,
            paragraph_spacing_after: 6
          },
          margins: {
            top: 1,
            bottom: 1,
            left: 1,
            right: 1,
            unit: "inches"
          },
          page_setup: {
            orientation: "Portrait",
            paper_size: "Letter"
          },
          indentation: {
            first_line: 0.5
          },
          headers_footers: {
            include_page_numbers: true,
            page_number_position: "Bottom Center"
          }
        }
      });
    }
  }, [initialData]);

  const handleSave = () => {
    onSave(formData);
  };

  const updateConfig = (path: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newData;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? `Edit ${initialData.name}` : "Create New Formatting Profile"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Profile Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter profile name"
            />
          </div>

          {/* Font & Spacing Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Font & Spacing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select
                    value={formData.config.font.family}
                    onValueChange={(value) => updateConfig('config.font.family', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Calibri">Calibri</SelectItem>
                      <SelectItem value="Garamond">Garamond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Input
                    type="number"
                    value={formData.config.font.size}
                    onChange={(e) => updateConfig('config.font.size', parseInt(e.target.value))}
                    min="8"
                    max="72"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Font Color</Label>
                  <Input
                    type="color"
                    value={formData.config.font.color}
                    onChange={(e) => updateConfig('config.font.color', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Line Spacing</Label>
                  <Select
                    value={formData.config.spacing.line_spacing.toString()}
                    onValueChange={(value) => updateConfig('config.spacing.line_spacing', parseFloat(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">1.0 (Single)</SelectItem>
                      <SelectItem value="1.15">1.15</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2.0">2.0 (Double)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Spacing After Paragraph (pts)</Label>
                  <Input
                    type="number"
                    value={formData.config.spacing.paragraph_spacing_after}
                    onChange={(e) => updateConfig('config.spacing.paragraph_spacing_after', parseInt(e.target.value))}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page Layout Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Page Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Margins</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm">Top</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.config.margins.top}
                        onChange={(e) => updateConfig('config.margins.top', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Bottom</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.config.margins.bottom}
                        onChange={(e) => updateConfig('config.margins.bottom', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Left</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.config.margins.left}
                        onChange={(e) => updateConfig('config.margins.left', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Right</Label>
                      <Input
                        type="number" 
                        step="0.1"
                        value={formData.config.margins.right}
                        onChange={(e) => updateConfig('config.margins.right', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm">Unit</Label>
                      <Select
                        value={formData.config.margins.unit}
                        onValueChange={(value) => updateConfig('config.margins.unit', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inches">inches</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="pt">pt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Page Orientation</Label>
                    <Select
                      value={formData.config.page_setup.orientation}
                      onValueChange={(value) => updateConfig('config.page_setup.orientation', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Portrait">Portrait</SelectItem>
                        <SelectItem value="Landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Paper Size</Label>
                    <Select
                      value={formData.config.page_setup.paper_size}
                      onValueChange={(value) => updateConfig('config.page_setup.paper_size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Letter">Letter</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="A4">A4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>First Line Indent (inches)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.config.indentation.first_line}
                      onChange={(e) => updateConfig('config.indentation.first_line', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Headers & Footers Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Headers & Footers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="page-numbers"
                  checked={formData.config.headers_footers.include_page_numbers}
                  onCheckedChange={(checked) => updateConfig('config.headers_footers.include_page_numbers', checked)}
                />
                <Label htmlFor="page-numbers">Show Page Numbers</Label>
              </div>

              {formData.config.headers_footers.include_page_numbers && (
                <div className="space-y-2">
                  <Label>Page Number Position</Label>
                  <Select
                    value={formData.config.headers_footers.page_number_position}
                    onValueChange={(value) => updateConfig('config.headers_footers.page_number_position', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bottom Center">Bottom Center</SelectItem>
                      <SelectItem value="Bottom Left">Bottom Left</SelectItem>
                      <SelectItem value="Bottom Right">Bottom Right</SelectItem>
                      <SelectItem value="Top Center">Top Center</SelectItem>
                      <SelectItem value="Top Left">Top Left</SelectItem>
                      <SelectItem value="Top Right">Top Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Default Toggle */}
          <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
            <Switch
              id="default-profile"
              checked={formData.is_default}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_default: checked }))}
            />
            <Label htmlFor="default-profile">Set as default profile</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.name.trim()}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormattingConfigModal;
