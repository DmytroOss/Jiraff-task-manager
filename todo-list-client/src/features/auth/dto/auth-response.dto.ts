import { UserResponseDto } from "@/features/auth/dto/user-response.dto.ts";

export type AuthResponseDto = {
  token: string;
  user: UserResponseDto;
};
