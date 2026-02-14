import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  validation?: RegisterOptions;
}

export function Input({ name, label, validation, ...rest }: InputProps) {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        {...register(name, validation)}
        {...rest}
        className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
