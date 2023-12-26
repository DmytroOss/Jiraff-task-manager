export type TaskWriteDto = {
  id?: number | undefined;
  assigneeId: number;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "FOR_REVIEW" | "COMPLETED";
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
};
