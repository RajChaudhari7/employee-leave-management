import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { UploadCloud, FileText, Image, X } from "lucide-react";

export default function FileUpload({ file, onFileSelect }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,

    maxSize: 5 * 1024 * 1024,

    accept: {
      "application/pdf": [],
      "image/png": [],
      "image/jpeg": [],
    },

    onDropAccepted: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },

    onDropRejected: (errors) => {
      const error = errors[0];

      if (error.errors[0].code === "file-too-large") {
        toast.error("Maximum file size is 5 MB");
      } else if (error.errors[0].code === "file-invalid-type") {
        toast.error("Only PDF, JPG and PNG files are allowed");
      } else {
        toast.error("Invalid file");
      }
    },
  });

  return (
    <div>
      {/* Upload Area */}

      <div
        {...getRootProps()}
        className={`

        border-2
        border-dashed
        rounded-2xl
        p-10
        transition
        cursor-pointer

        ${
          isDragActive
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
        }

      `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center">
          <UploadCloud size={55} className="text-blue-600 mb-4" />

          <h3 className="text-lg font-semibold">
            {isDragActive
              ? "Drop the file here..."
              : "Drag & Drop your document"}
          </h3>

          <p className="text-gray-500 mt-2">or click to browse</p>

          <div className="flex gap-2 mt-6">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              PDF
            </span>

            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              JPG
            </span>

            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              PNG
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-5">Maximum file size : 5 MB</p>
        </div>
      </div>

      {/* Selected File */}

      {file && (
        <div className="mt-6 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-4">
            {file.type.includes("image") ? (
              <Image size={32} className="text-green-600" />
            ) : (
              <FileText size={32} className="text-red-600" />
            )}

            <div>
              <p className="font-semibold">{file.name}</p>

              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onFileSelect(null)}
            className="p-2 rounded-full hover:bg-red-100 transition"
          >
            <X size={20} className="text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
}
