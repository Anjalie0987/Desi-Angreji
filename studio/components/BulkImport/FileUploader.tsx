import React, { useRef } from 'react';
import { Card, Text, Stack, Button, Flex } from '@sanity/ui';
import { UploadIcon } from '@sanity/icons';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'xlsx') {
      onFileSelect(file);
    } else {
      alert('Please upload a valid CSV or Excel (.xlsx) file.');
    }
  };

  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Text weight="semibold" size={2}>Supported Files</Text>
        <Text muted>CSV, Excel (.xlsx)</Text>

        <Card 
          padding={5} 
          radius={2} 
          border 
          style={{ borderStyle: 'dashed', textAlign: 'center', cursor: 'pointer' }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Flex direction="column" align="center" gap={3}>
            <Text size={3}><UploadIcon /></Text>
            <Text weight="medium">Drag & Drop OR Choose File</Text>
            <Text muted size={1}>No file selected</Text>
          </Flex>
          
          <input 
            type="file" 
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
            style={{ display: 'none' }} 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Card>
      </Stack>
    </Card>
  );
}
