import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div
      className={
        "fixed z-40 h-full w-full backdrop-blur bg-black/10 flex justify-center items-center"
      }
    >
      <Loader2 size={50} className={"animate-spin"} />
    </div>
  );
};
