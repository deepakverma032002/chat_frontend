import { BASE_API_ENDPOINT } from "@/utils/constant";
import CoreApiService from "./CoreApiService";
import { deleteCookie } from "cookies-next";

class AuthService {
  async login(body: Login) {
    return CoreApiService.post<{ result: { token: string } }>(
      "/user/login",
      body
    );
  }

  async signup(body: Signup) {
    return CoreApiService.post("/user/sign-up", body);
  }

  async me(token: string) {
    return await fetch(`${BASE_API_ENDPOINT}user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["user-data"],
      },
    });
  }

  async logout() {
    return new Promise((resolve) => {
      deleteCookie("token");
      resolve(true);
    });
  }

  async verifyEmail(body: VerifyEmail) {
    return CoreApiService.post("/user/verify-email", body);
  }

  async getVerificationCode(email: string) {
    return CoreApiService.post(`/user/get-email-verification-otp`, { email });
  }

  async getPreSignedUrl() {
    return CoreApiService.get<{ result: { url: string } }>("/upload-image");
  }
}

const authService = new AuthService();
export default authService;
