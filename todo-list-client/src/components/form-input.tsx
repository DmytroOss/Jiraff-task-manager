import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Control } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea.tsx";

type FormFieldProps = {
  control: Control;

  type?: string;
  name: string;
  label: string;
  placeholder: string;

  isDisabled: boolean;
};

export function FormInput({
  control,
  type = "text",
  name,
  label,
  placeholder,
  isDisabled,
}: FormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"my-2"}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                disabled={isDisabled}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input
                type={type}
                disabled={isDisabled}
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
