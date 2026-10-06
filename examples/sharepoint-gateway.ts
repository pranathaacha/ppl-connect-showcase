// Sanitized adaptation for the public PPL Connect case study.
// This interface illustrates the backend integration boundary only.

export type DocumentItem = {
  id: string;
  name: string;
  kind: "file" | "folder";
};

export type UploadResult = {
  id: string;
  name: string;
};

export interface DocumentGateway {
  listChildren(
    approvedLocationId: string
  ): Promise<DocumentItem[]>;

  search(
    approvedLocationId: string,
    query: string
  ): Promise<DocumentItem[]>;

  uploadFile(
    approvedLocationId: string,
    fileName: string,
    bytes: Uint8Array
  ): Promise<UploadResult>;

  downloadFile(
    documentId: string
  ): Promise<Uint8Array>;

  createFolder(
    approvedLocationId: string,
    folderName: string
  ): Promise<DocumentItem>;
}

export type DocumentContext = {
  employeeId: string;
  workflowId: string;
  documentType: string;
};

export function resolveApprovedLocation(
  context: DocumentContext
): string {
  // In the production application, storage context is derived from
  // validated application data and server-side configuration.
  return [
    "employee-workflows",
    context.employeeId,
    context.workflowId,
    context.documentType
  ].join("/");
}
