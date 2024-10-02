"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Paperclip } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { cn } from "./lib/utils";

export interface FileUploaderProps {
  config?: {
    inputId?: string;
    fileSizeLimit?: number;
    allowedExtensions?: string[];
    checkExtension?: (extension: string) => string | null;
    disabled: boolean;
  };
  onFileUpload: (file: File) => Promise<void>;
  onFileError?: (errMsg: string) => void;
}

const DEFAULT_INPUT_ID = "fileInput";
const DEFAULT_FILE_SIZE_LIMIT = 1024 * 1024 * 50; // 50 MB

export default function FileUploader({
  config,
  onFileUpload,
  onFileError,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const inputId = config?.inputId || DEFAULT_INPUT_ID;
  const fileSizeLimit = config?.fileSizeLimit || DEFAULT_FILE_SIZE_LIMIT;
  const allowedExtensions = config?.allowedExtensions;
  const defaultCheckExtension = (extension: string) => {
    if (allowedExtensions && !allowedExtensions.includes(extension)) {
      return `Invalid file type. Please select a file with one of these formats: ${allowedExtensions!.join(
        ",",
      )}`;
    }
    return null;
  };
  const checkExtension = config?.checkExtension ?? defaultCheckExtension;

  const isFileSizeExceeded = (file: File) => {
    return file.size > fileSizeLimit;
  };

  const resetInput = () => {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    await handleUpload(file);
    resetInput();
    setUploading(false);
  };

  const handleUpload = async (file: File) => {
    const onFileUploadError = onFileError || window.alert;
    const fileExtension = file.name.split(".").pop() || "";
    const extensionFileError = checkExtension(fileExtension);
    if (extensionFileError) {
      return onFileUploadError(extensionFileError);
    }

    if (isFileSizeExceeded(file)) {
      return onFileUploadError(
        `File size exceeded. Limit is ${fileSizeLimit / 1024 / 1024} MB`,
      );
    }

    await onFileUpload(file);
  };

  return (
    <div className="self-stretch">
      <Input
        type="file"
        id={inputId}
        style={{ display: "none" }}
        onChange={onFileChange}
        accept={allowedExtensions?.join(",")}
        disabled={config?.disabled || uploading}
      />
      <Label
        htmlFor={inputId}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "cursor-pointer",
          uploading && "opacity-50",
        )}
      >
        <span className="sr-only">Attach file</span>
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Paperclip className="size-4" />
        )}
      </Label>
    </div>
  );
}
