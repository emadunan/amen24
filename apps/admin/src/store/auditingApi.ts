import { createAuditingApi } from "@amen24/ui";
import { apiUrl } from "../constants";

export const auditingApi = createAuditingApi(apiUrl);

export const { useGetAuditingRecordsQuery } = auditingApi;