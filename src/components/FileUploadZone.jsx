import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";

const FileUploadZone = ({
    label,
    required,
    className,
    accept,
    compact = false,
    onFileSelect,
}) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            onFileSelect?.(droppedFile);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            onFileSelect?.(selectedFile);
        }
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setFile(null);
        onFileSelect?.(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className={cn("space-y-2", className)}>
            <Label className="text-sm font-medium text-foreground">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200",
                    compact ? "p-4" : "p-6",
                    isDragging && "border-primary bg-accent",
                    file ? "border-success bg-success/5" : "border-border hover:border-primary/50 hover:bg-accent/50"
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {file ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                                <File className="w-5 h-5 text-success" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                                    {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024).toFixed(1)} KB
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={removeFile}
                            className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center">
                        <div className={cn(
                            "rounded-full bg-accent flex items-center justify-center mb-3",
                            compact ? "w-10 h-10" : "w-12 h-12"
                        )}>
                            <Upload className={cn(
                                "text-primary",
                                compact ? "w-4 h-4" : "w-5 h-5"
                            )} />
                        </div>
                        <p className={cn(
                            "font-medium text-foreground",
                            compact ? "text-xs" : "text-sm"
                        )}>
                            Drag & drop or click
                        </p>
                        <p className={cn(
                            "text-muted-foreground mt-1",
                            compact ? "text-[10px]" : "text-xs"
                        )}>
                            PDF, JPG, PNG up to 5MB
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploadZone;
