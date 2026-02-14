import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: SelectOption[];
  validation?: RegisterOptions;
}

export function Select({ name, label, options, validation, ...rest }: SelectProps) {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-medium mb-1">
        {label}
      </label>
      <select
        id={name}
        {...register(name, validation)}
        {...rest}
        className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
