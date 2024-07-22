import React from "react";

import { cn } from "@/utils/helper";

const Input: React.FC<InputProps> = ({
  disabled,
  label,
  error,
  isIcon,
  icon,
  className,
  wrapperClassName,
  labelClassName,
  iconClassName,
  inputBorderRadius = "8px",
  inputWrapperClassName,
  ...props
}) => {
  const inputClassName = cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className,
    { "cursor-not-allowed": disabled }
  );

  return (
    <div className={cn("mb-1", wrapperClassName)}>
      <div className={error ? "mb-1" : ""}>
        {label && (
          <label
            className={cn(
              "mb-2 block font-semibold text-[#3f2a2a] dark:text-white",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            `flex h-10 items-center border border-neutral-1000 dark:border-neutral-400`,
            inputWrapperClassName
          )}
          style={{ borderRadius: inputBorderRadius }}
        >
          {isIcon && (
            <span
              className={cn("ms-2 text-2xl text-neutral-500", iconClassName)}
            >
              {icon}
            </span>
          )}
          <input className={inputClassName} disabled={disabled} {...props} />
        </div>
      </div>

      {error ? (
        <div>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
