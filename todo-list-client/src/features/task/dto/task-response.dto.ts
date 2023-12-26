import { UserResponseDto } from "@/features/auth/dto/user-response.dto.ts";

export type TaskResponseDto = {
  id: number;
  title: string;
  description: string;

  updatedBy: string;
  assignee: UserResponseDto;

  status: "TODO" | "IN_PROGRESS" | "FOR_REVIEW" | "COMPLETED";
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
};
