import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../utils/formatSize";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const maxFileSize = 20 * 1024 * 1024; // 20 MB

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0] || null;
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    maxSize: maxFileSize,
  });

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()} className="p-6 cursor-pointer">
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag & drop your resume here, or click to select a file</p>
        )}

        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="size-20" />
          </div>

          {file ? (
            <div
              className="uploader-selected-file flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3">
                <img
                  src="/images/pdf.png"
                  alt="pdf"
                  style={{ width: 40, height: 40 }}
                />
                <div>
                  <p className="text-lg text-gray-700 font-medium max-w-xs truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  onFileSelect?.(null);
                }}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-lg text-gray-500">
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
