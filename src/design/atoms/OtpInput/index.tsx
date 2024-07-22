"use client";

import { cn } from "@/utils/helper";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../input-otp";

interface OtpInputProps {
  length?: number;
  onOtpSubmit?: (otp: string) => void;
  onBlur?: () => void;
  label?: string;
  labelClassName?: string;
  error?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  onOtpSubmit,
  label,
  labelClassName,
  error,
  onBlur,
}) => {
  return (
    <div className="mb-4">
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
      <InputOTP
        maxLength={length}
        onBlur={onBlur}
        onChange={(val: string) => onOtpSubmit?.(val)}
      >
        <InputOTPGroup>
          {Array.from({ length }, (_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {/* <input type="hidden" onBlur={() => onOtpSubmit?.("")} /> */}
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
export default OtpInput;
