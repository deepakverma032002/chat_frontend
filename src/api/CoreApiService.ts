import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import applyCaseMiddleware, {
  ApplyCaseMiddlewareOptions,
} from "axios-case-converter";
import { BASE_API_ENDPOINT } from "@/utils/constant";
import { getCookie } from "cookies-next";

const options: ApplyCaseMiddlewareOptions = {
  caseMiddleware: {
    requestTransformer: (config: any) => config,
  },
};

const axios = applyCaseMiddleware(
  Axios.create({
    baseURL: BASE_API_ENDPOINT,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }),
  options
);

const responseData = <T extends AxiosResponse<any>>(response: T) =>
  response.data;

const handleError = (error: AxiosError) => {
  throw error;
};

class CoreAPIService {
  get = async <R>(url: string, { ...config }: AxiosRequestConfig = {}) =>
    axios
      .request<R>({
        method: "get",
        url,
        ...config,
      })
      .then<R>(responseData)
      .catch(handleError);

  post = async <R>(
    url: string,
    data: AnyObject = {},
    { ...config }: AxiosRequestConfig = {}
  ) =>
    axios
      .request<R>({
        method: "post",
        url,
        data: data,
        ...config,
      })
      .then<R>(responseData)
      .catch(handleError);

  put = async <R>(url: string, data: AnyObject) =>
    axios
      .request<R>({
        method: "put",
        url,
        data: data,
      })
      .then<R>(responseData)
      .catch(handleError);

  patch = async <R>(
    url: string,
    data: AnyObject = {},
    { ...config }: AxiosRequestConfig = {}
  ) =>
    axios
      .request<R>({
        method: "patch",
        url: `${url}`,
        data: data,
        ...config,
      })
      .then<R>(responseData)
      .catch(handleError);

  delete = async <R>(url: string, data: AnyObject = {}) =>
    axios
      .request<R>({
        method: "delete",
        url: `${url}`,
        data: data,
      })
      .then<R>(responseData)
      .catch(handleError);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CoreAPIService();
