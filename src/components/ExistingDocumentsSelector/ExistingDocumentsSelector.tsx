import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Image as ImageIcon, Eye } from "lucide-react";

export interface ExistingDocument {
  id: string;
  name: string;
  type: string; // "pdf" | "image" | etc
  category: string;
  uploadedAt: string;
  size: string;
}

interface ExistingDocumentsSelectorProps {
  documents: ExistingDocument[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

const ExistingDocumentsSelector = ({
  documents,
  onSelectionChange,
}: ExistingDocumentsSelectorProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleDocument = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((d) => d !== id)
      : [...selectedIds, id];
    setSelectedIds(next);
    onSelectionChange?.(next);
  };

  const selectAll = () => {
    const allIds = documents.map((d) => d.id);
    const next = selectedIds.length === documents.length ? [] : allIds;
    setSelectedIds(next);
    onSelectionChange?.(next);
  };

  if (documents.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full" />
          Previously Uploaded Documents
        </h4>
        <button
          onClick={selectAll}
          className="text-xs font-medium text-violet-500 hover:underline transition-colors"
        >
          {selectedIds.length === documents.length ? "Deselect All" : "Select All"}
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Check the documents you'd like to reuse. Unchecked documents will require a new upload below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {documents.map((doc) => {
          const isSelected = selectedIds.includes(doc.id);
          const isImage = doc.type === "image";

          return (
            <div
              key={doc.id}
              onClick={() => toggleDocument(doc.id)}
              className={`flex items-start gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-violet-500 bg-violet-50 hover:bg-violet-100"
                  : "border-border bg-card hover:border-violet-300"
              }`}
            >
              <Checkbox
                checked={isSelected}
                className="mt-0.5 data-[state=checked]:bg-violet-500 data-[state=checked]:border-primary"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {isImage ? (
                    <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                  )}
                  <span className="text-sm font-medium text-foreground truncate">
                    {doc.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{doc.category}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{doc.uploadedAt}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // preview logic
                }}
                className="text-muted-foreground hover:text-primary transition-colors shrink-0"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExistingDocumentsSelector;
