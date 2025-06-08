import { zodResolver } from "@hookform/resolvers/zod";
import type { HTMLInputTypeAttribute } from "react";
import { useForm } from "react-hook-form";

import {
  type PatientFormField,
  patientFormSchema,
  type PatientFormValue,
} from "@/features/patient/validators";
import { cn } from "@/lib/cn";

interface PatientFormProps {
  closeModal?: () => void;
}

export function PatientForm({ closeModal }: PatientFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PatientFormValue>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      sex: "Male",
    },
  });

  const onSubmit = (data: PatientFormValue) => {
    console.log(data);
    reset();
    if (closeModal) closeModal();
  };

  interface InputProps {
    field: PatientFormField;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
  }

  const Input = ({ field, type, placeholder }: InputProps) => {
    const label =
      field === "dob"
        ? "Date of Birth"
        : field.replace(/([a-z])([A-Z])/g, "$1 $2");

    return (
      <>
        <label
          className={cn("label", {
            capitalize: field !== "dob",
          })}
        >
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={cn("input w-full", {
            "input-error": Boolean(errors[field]),
          })}
          {...register(field)}
        />
        <p className="text-error text-end">{errors[field]?.message}</p>
      </>
    );
  };

  type SelectProps<T extends PatientFormField> = {
    field: T;
    options: T extends "sex"
      ? Array<PatientFormValue["sex"]>
      : T extends "bloodType"
        ? Array<NonNullable<PatientFormValue["bloodType"]>>
        : T extends "civilStatus"
          ? Array<NonNullable<PatientFormValue["civilStatus"]>>
          : never;
    defaultValue?: T extends "sex"
      ? PatientFormValue["sex"]
      : T extends "bloodType"
        ? PatientFormValue["bloodType"]
        : T extends "civilStatus"
          ? PatientFormValue["civilStatus"]
          : never;
  };

  const Select = <T extends PatientFormField>({
    field,
    defaultValue,
    options,
  }: SelectProps<T>) => {
    const label = field.replace(/([a-z])([A-Z])/g, "$1 $2");

    return (
      <>
        <label className="label capitalize">{`${label}`}</label>
        <select
          defaultValue={defaultValue}
          className={cn("select w-full", {
            "select-error": Boolean(errors[field]),
          })}
          {...register(field)}
        >
          {defaultValue ?? <option value={undefined}>Not specified</option>}
          {options.map((option) => (
            <>
              <option value={option}>{option}</option>
            </>
          ))}
        </select>

        <p className="text-error">{errors[field]?.message}</p>
      </>
    );
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">Patient Form</h2>
      <fieldset className="fieldset">
        <Input field="firstName" placeholder="John" />
        <Input field="lastName" placeholder="Doe" />
        <Input field="dob" type="date" />
        <Select
          field="sex"
          defaultValue="Male"
          options={["Male", "Female", "Intersex", "Unknown"]}
        />
        <Select
          field="bloodType"
          options={["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]}
        />
        <Select
          field="civilStatus"
          options={["Single", "Married", "Widowed", "Divorced"]}
        />
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
}
