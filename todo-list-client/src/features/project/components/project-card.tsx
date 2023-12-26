import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ProjectResponseDto } from "@/features/project/dto/project-response.dto.ts";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ id, name, description }: ProjectResponseDto) => {
  const navigation = useNavigate();

  return (
    <Card onClick={() => navigation(`/projects/${id}`)}>
      <CardTitle className={"p-4 pt-3 pb-2 flex justify-between items-center"}>
        {name}
      </CardTitle>
      <CardContent className={"text-gray-500 italic h-[100px] overflow-hidden"}>
        {description}
      </CardContent>
    </Card>
  );
};
