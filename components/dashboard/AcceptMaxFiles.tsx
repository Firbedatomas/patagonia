import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const DropzoneArea = styled.div`
  transition: all 0.3s ease;
`;

interface AcceptMaxFilesProps {
  onFileUpload: (file: File | null) => void;
  logo: File | null;
  onPreviewAvailable: (isAvailable: boolean, previewImages: string[]) => void;
}

const AcceptMaxFiles: React.FC<AcceptMaxFilesProps> = ({
  onFileUpload,
  logo,
  onPreviewAvailable,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    const file = acceptedFiles[0];
    onFileUpload(file);
    const objectURL = URL.createObjectURL(file);
    onPreviewAvailable(true, [objectURL]);
    setImageLoaded(true); // Marca la imagen como cargada
  }, [onFileUpload, onPreviewAvailable]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
    onDrop,
  });

  useEffect(() => {
    if (logo && !imageLoaded) { // Verifica si la imagen no se ha cargado aún
      const objectURL = URL.createObjectURL(logo);
      onPreviewAvailable(true, [objectURL]);
      setImageLoaded(true); // Marca la imagen como cargada
    }
  }, [logo, imageLoaded, onPreviewAvailable]);

  return (
    <section className="container mt-4">
      <DropzoneArea {...getRootProps({ className: "dropzone-area" })}>
        <input {...getInputProps()} />
        <div className="border-4 border-dashed border-indigo-200 rounded-lg transition-all hover:border-indigo-500 hover:bg-indigo-100 p-6 text-center cursor-pointer hover:shadow-lg">
          <p className="text-indigo-500 text-2xl font-semibold mb-2 transition-all hover:text-indigo-700">
            Arrastra el logo o haz click y súbelo
          </p>
          <p className="text-gray-500">
            Formatos aceptados: jpg, png, etc.
          </p>
        </div>
      </DropzoneArea>
    </section>
  );
};

export default AcceptMaxFiles;
