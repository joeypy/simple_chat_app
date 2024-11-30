"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldError } from "react-hook-form";

interface PasswordInputProps {
  label?: string;
  id?: string;
  error?: FieldError;
  field: {
    name: string;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: string;
    disabled?: boolean;
  };
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  error,
  field,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormItem>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <FormControl>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            id={id}
            placeholder="Contraseña"
            type={showPassword ? "text" : "password"}
            {...field}
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </FormControl>
      {error && <FormMessage>{error.message}</FormMessage>}
    </FormItem>
  );
};
