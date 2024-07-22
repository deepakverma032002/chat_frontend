import { BASE_API_ENDPOINT } from "@/utils/constant";
import CoreApiService from "./CoreApiService";

class AuthService {
  async login(body: Login) {
    return CoreApiService.post("/user/login", body);
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
    return CoreApiService.post("/user/logout");
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
