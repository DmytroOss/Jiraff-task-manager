import { eventbus } from "@/util/event-bus.ts";

export const taskEventChannel = eventbus<{
  onTasksChange: () => void;
}>();
