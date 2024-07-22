type VerifyEmail = { email: string; otp: string };
type Signup = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  image?: string;
};

type Login = {
  email: string;
  password: string;
};

type User = {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  image: string;
  lastName: string;
  phone: string;
  role: string;
  updatedAt: string;
};
