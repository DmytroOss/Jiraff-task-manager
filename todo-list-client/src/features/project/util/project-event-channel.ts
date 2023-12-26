import { eventbus } from "@/util/event-bus.ts";

export const projectEventChannel = eventbus<{
  onProjectsChange: () => void;
}>();
