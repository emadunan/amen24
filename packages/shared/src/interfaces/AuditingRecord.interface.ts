export interface AuditingRecord {
  id: number;
  action: string;
  performedBy: string;
  metadata?: string;
  createdAt: Date;
}