import React, { useState } from "react";
import { ContainerFileUploadCS } from "./fileupload.styles.ts";
import { CustomTsDispatch } from "../../hooks/dispatch.ts";
import { importarPlanilhaRedux } from "../../utils/importExcel.ts";
import { toast } from "react-toastify";
import { store } from "../../store.ts"; 
const FileUpload: React.FC = () => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = CustomTsDispatch();

  const handleFile = async (file: File) => {
    setError(null);

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setError(
        "Formato de arquivo inválido. Apenas .xlsx e .xls são permitidos."
      );
      return;
    }

    setFileName(file.name);
    try {
      await importarPlanilhaRedux(file, dispatch, store.getState);
      toast.success("Dados importados com sucesso.");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any ){
      toast.error(error.message);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFile(event.target.files[0]);
    }
  };

  const clearFile = () => {
    setFileName(null);
    setError(null);
  };

  return (
    <ContainerFileUploadCS
      dragging={dragging}
      uploaded={!!fileName}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
      role="button"
      aria-label="Área de upload de arquivo"
    >
      <input
        type="file"
        id="fileInput"
        className="file_input"
        accept=".xlsx, .xls"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      {!fileName && (
        <p>Arraste e solte o arquivo aqui ou clique para selecionar</p>
      )}
      {fileName && <p className="file_name">{fileName}</p>}
      {error && (
        <p className="error_message" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {fileName && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Impede que o clique no botão dispare o input
            clearFile();
          }}
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Limpar Arquivo
        </button>
      )}
    </ContainerFileUploadCS>
  );
};

export default FileUpload;
