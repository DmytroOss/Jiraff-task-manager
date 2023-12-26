import { eventbus } from "@/util/event-bus.ts";

export const collaboratorEventChannel = eventbus<{
  onCollaboratorChange: () => void;
}>();
