"use client";

import Input from "@/design/atoms/Input";
import OtpInput from "@/design/atoms/OtpInput";
import { useVerifyEmail, useGetVerificationCode } from "@/hooks/useAuthService";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/design/atoms/card";
import { Button } from "@/design/atoms/button";

const VerificationTemplate = () => {
  const [isOtpGet, setIsOtpGet] = useState<boolean>(false);
  const { mutate: getVerifyCode, isPending: isPendingGetCode } =
    useGetVerificationCode();

  const { mutate: verify, isPending: isVerifyPendingEmail } = useVerifyEmail();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      otp: Yup.string().when("isOtpGet", () => {
        return isOtpGet
          ? Yup.string()
              .required("Otp is required")
              .min(6, "Otp must be 6 digits")
          : Yup.string().notRequired();
      }),
    }),
    onSubmit: (val) => {
      if (isOtpGet) {
        verify(val, {
          onSuccess: () => {
            toast.success("Verify successfully");
            router.push("/");
            formik.resetForm();
          },
          onError: (msg) => {
            if (msg instanceof AxiosError) {
              toast.error(msg.response?.data.message);
            }
          },
        });
      } else {
        getVerifyCode(val.email, {
          onSuccess: () => {
            setIsOtpGet(true);
            toast.success("Otp get successfully");
          },
          onError: (msg) => {
            if (msg instanceof AxiosError) {
              toast.error(msg.response?.data.message);
            }
          },
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle> Verify Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="left-0 right-0 inline-block border-gray-200 py-2.5 sm:px-4">
            <form onSubmit={formik.handleSubmit}>
              <Input
                className="px-2"
                wrapperClassName="mb-4"
                label="Email"
                placeholder="Enter Your Email"
                type="email"
                {...formik.getFieldProps("email")}
                error={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : ""
                }
                isIcon={false}
              />

              {isOtpGet && (
                <OtpInput
                  label="Otp"
                  length={6}
                  error={
                    formik.errors.otp && formik.touched.otp
                      ? formik.errors.otp
                      : ""
                  }
                  onOtpSubmit={(value) => {
                    formik.setFieldValue("otp", value);
                  }}
                />
              )}

              <Button
                type="submit"
                disabled={isPendingGetCode || isVerifyPendingEmail}
              >
                {isPendingGetCode || isVerifyPendingEmail
                  ? "Loading..."
                  : !isOtpGet
                  ? "Get OTP"
                  : "Verify"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationTemplate;
