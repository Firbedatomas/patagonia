import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from 'styled-components';

const DropzoneArea = styled.div`
  transition: all 0.3s ease;
`;

interface AcceptMaxFilesProps {
  onPreviewAvailable: (isAvailable: boolean, previewImages: string[]) => void;
}

const AcceptMaxFiles: React.FC<AcceptMaxFilesProps> = ({ onPreviewAvailable }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({ maxFiles: 1 });

  useEffect(() => {
    onPreviewAvailable(previewImages.length > 0, previewImages);
  }, [previewImages, onPreviewAvailable]);  // Añadido onPreviewAvailable aquí
  

  useEffect(() => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    const imagePreviews = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  }, [acceptedFiles]);

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map(e => <li key={e.code}>{e.message}</li>)}
      </ul>
    </li>
  )); 

  return (
    <section className="container">
      <DropzoneArea {...getRootProps({ className: "dropzone-area" })}>
        <input {...getInputProps()} />
        <div className="border-4 border-dashed border-indigo-200 rounded-lg transition-all hover:border-indigo-500 hover:bg-indigo-100 p-6 text-center cursor-pointer hover:shadow-lg">
          <p className="text-indigo-500 text-2xl font-semibold mb-2 transition-all hover:text-indigo-700">
            Arrastra el logo o haz click y subelo
          </p>
          <p className="text-gray-500">
            Formatos aceptados: jpg, png, etc.
          </p>
        </div>
      </DropzoneArea>
      {/* Considera mostrar estos elementos en algún lugar de tu UI */}
      <ul>{acceptedFileItems}</ul>
      <ul>{fileRejectionItems}</ul>
    </section>
  );
}

export default AcceptMaxFiles;
