export type StatusTone = 'danger' | 'processing' | 'success' | 'warning';
export type OwnerKey = 'avery' | 'mina' | 'noah';
export type PriorityKey = 'high' | 'low' | 'medium';
export type WorkflowStatusKey = 'completed' | 'paused' | 'running';

export interface WorkflowRow extends Record<string, unknown> {
  detail: string;
  id: string;
  name: string;
  owner: string;
  priority: string;
  priorityTone: StatusTone;
  status: string;
  statusTone: StatusTone;
  trigger: string;
}

export interface SortableRow extends Record<string, unknown> {
  category: string;
  id: number;
  name: string;
  sort: number;
  updatedAt: string;
}

export interface EditableRow extends Record<string, unknown> {
  id: string;
  owner: string;
  priority: string;
  status: string;
  task: string;
}

export interface OrderRow extends Record<string, unknown> {
  amount: string;
  customer: string;
  id: number;
  orderNo: string;
  plan: string;
  progress: string;
  status: string;
  statusTone: 'processing' | 'warning';
}

export type Translate = (key: string, params?: Record<string, string | number>) => string;
