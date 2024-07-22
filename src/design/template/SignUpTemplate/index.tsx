"use client";

import Input from "@/design/atoms/Input";
import { useLogin, useSingUp } from "@/hooks/useAuthService";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/design/atoms/card";
import { Button } from "@/design/atoms/button";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Progress } from "@/design/atoms/progress";
import { useGoogleLogin } from "@react-oauth/google";

const SignUpTemplate = () => {
  const { mutate: signup, isPending } = useSingUp();
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const {
    mutate: uploadFile,
    progress,
    setProgress,
    isPending: isUploading,
  } = useFileUpload();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .when("password", (password, schema) => {
          if (password) {
            return schema.test(
              "passwords-match",
              "Passwords must match",
              function (value) {
                return this.parent.password === value;
              }
            );
          }
          return schema;
        }),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phone: Yup.string().min(10, "Should be 10 digits"),
      image: Yup.string(),
    }),

    onSubmit: (val) => {
      signup(val, {
        onSuccess: () => {
          toast.success("Sign up successfully");
          router.push("/verification");
          formik.resetForm();
        },
        onError: () => {
          toast.error("Sign up failed");
        },
      });
    },
  });

  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
            <form
              className="flex flex-col gap-4 pb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex gap-4 md:flex-row flex-col">
                <Input
                  className="px-2"
                  label="First Name"
                  placeholder="Enter Your First Name"
                  type="firstName"
                  {...formik.getFieldProps("firstName")}
                  error={
                    formik.errors.firstName && formik.touched.firstName
                      ? formik.errors.firstName
                      : ""
                  }
                  isIcon={false}
                />

                <Input
                  className="px-2"
                  label="Last Name"
                  placeholder="Enter Your Last Name"
                  type="lastName"
                  {...formik.getFieldProps("lastName")}
                  error={
                    formik.errors.lastName && formik.touched.lastName
                      ? formik.errors.lastName
                      : ""
                  }
                  isIcon={false}
                />
              </div>

              <Input
                className="px-2"
                label="Phone"
                placeholder="Enter Your Phone"
                type="phone"
                {...formik.getFieldProps("phone")}
                error={
                  formik.errors.phone && formik.touched.phone
                    ? formik.errors.phone
                    : ""
                }
                isIcon={false}
              />

              <div>
                <Input
                  className="px-2"
                  label="Profile Image"
                  placeholder="Upload Image"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    if (e.target.files) {
                      uploadFile(e.target.files[0], {
                        onSuccess: (url) => {
                          formik.setFieldValue("image", url.secureUrl);
                        },
                      });
                    }
                  }}
                  error={
                    formik.errors.image && formik.touched.image
                      ? formik.errors.image
                      : ""
                  }
                  isIcon={false}
                />

                {progress && isUploading ? (
                  <Progress value={progress} className="w-full h-1" />
                ) : (
                  formik.values.image && (
                    <div className="space-x-2">
                      <Link
                        href={formik.values.image}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        {formik.values.image.slice(0, 20)}...
                        {formik.values.image.slice(-20)}
                      </Link>
                      <Button
                        variant={"ghost"}
                        type="button"
                        onClick={() => {
                          formik.setFieldValue("image", "");
                          (
                            document.querySelector(
                              "input[type='file']"
                            ) as HTMLInputElement
                          ).value = "";
                          setProgress(0);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )
                )}
              </div>

              <Input
                className="px-2"
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

              <Input
                className="px-2"
                label="Password"
                placeholder="Enter Your Password"
                type="password"
                {...formik.getFieldProps("password")}
                error={
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : ""
                }
                isIcon={false}
              />

              <Input
                className="px-2"
                label="Confirm Password"
                placeholder="Enter Your Confirm Password"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                error={
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : ""
                }
                isIcon={false}
              />

              <div className="flex flex-col gap-2">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Sign up"}
                </Button>
                <Button
                  className="gap-2"
                  variant={"outline"}
                  type="button"
                  onClick={() => googleLogin()}
                >
                  <svg
                    className="text-lg"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                    enableBackground="new 0 0 48 48"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  Sign up with Google
                </Button>
                <Button className="gap-2" variant={"outline"} type="button">
                  <svg
                    className="text-lg"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                  </svg>
                  Sign up with Facebook
                </Button>
              </div>
            </form>
            <div className="min-w-[270px]">
              <div className="mt-4 text-center dark:text-gray-200">
                Existing user?{" "}
                <Link
                  className="text-blue-500 underline hover:text-blue-600"
                  href="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpTemplate;
