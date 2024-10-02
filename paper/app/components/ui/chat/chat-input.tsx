import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSONValue } from "ai";
import { CornerDownLeft, Mic } from "lucide-react";
import { DocumentPreview } from "../document-preview";
import UploadImagePreview from "../upload-image-preview";
import { ChatHandler } from "./chat.interface";
import { useFile } from "./hooks/use-file";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FileUploader from "../file-uploader";

const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "csv", "pdf", "txt", "docx"];

export default function ChatInput(
  props: Pick<
    ChatHandler,
    | "isLoading"
    | "input"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
    | "handleInputChange"
    | "messages"
    | "setInput"
    | "append"
  > & {
    requestParams?: any;
    setRequestData?: React.Dispatch<any>;
  },
) {
  const {
    imageUrl,
    setImageUrl,
    uploadFile,
    files,
    removeDoc,
    reset,
    getAnnotations,
  } = useFile();

  // default submit function does not handle including annotations in the message
  // so we need to use append function to submit new message with annotations
  const handleSubmitWithAnnotations = (
    e: React.FormEvent<HTMLFormElement>,
    annotations: JSONValue[] | undefined,
  ) => {
    e.preventDefault();
    props.append!({
      content: props.input,
      role: "user",
      createdAt: new Date(),
      annotations,
    });
    props.setInput!("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const annotations = getAnnotations();
    if (annotations.length) {
      handleSubmitWithAnnotations(e, annotations);
      return reset();
    }
    props.handleSubmit(e);
  };

  const handleUploadFile = async (file: File) => {
    if (imageUrl || files.length > 0) {
      alert("You can only upload one file at a time.");
      return;
    }
    try {
      await uploadFile(file, props.requestParams);
      props.onFileUpload?.(file);
    } catch (error: any) {
      const onFileUploadError = props.onFileError || window.alert;
      onFileUploadError(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>

      {imageUrl && (
        <UploadImagePreview url={imageUrl} onRemove={() => setImageUrl(null)} />
      )}
      {files.length > 0 && (
        <div className="flex gap-4 w-full overflow-auto py-2">
          {files.map((file) => (
            <DocumentPreview
              key={file.id}
              file={file}
              onRemove={() => removeDoc(file)}
            />
          ))}
        </div>
      )}
      <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Input
          autoFocus
          name="message"
          placeholder="Type a message"
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={props.input}
          onChange={props.handleInputChange}
        />
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <FileUploader
                onFileUpload={handleUploadFile}
                onFileError={props.onFileError}
                config={{
                  allowedExtensions: ALLOWED_EXTENSIONS,
                  disabled: props.isLoading,
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
          <Button
            type="submit"
            size="sm"
            className="ml-auto gap-1.5"
            disabled={props.isLoading || !props.input.trim()}
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </form>
  );
}
