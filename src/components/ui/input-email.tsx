"use client";

import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldError } from "react-hook-form";

interface EmailInputProps {
  label?: string;
  id: string;
  error?: FieldError;
  field: {
    name: string;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: string;
    disabled?: boolean;
  };
}

export const EmailInput: React.FC<EmailInputProps> = ({
  label,
  id,
  error,
  field,
}) => {
  return (
    <FormItem>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <FormControl>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id={id}
            placeholder="Correo electrónico"
            type="email"
            {...field}
            className="pl-10"
          />
        </div>
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};
