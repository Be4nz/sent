import axios, { AxiosResponse } from "axios";

export const get = async <T>(
  endpoint: string,
  token: string
): Promise<AxiosResponse<T, any>> => {
  const response = await axios.get<T>(
    `http://localhost:3001/api/v1${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const post = async <T>(
  endpoint: string,
  data: T,
  token: string
): Promise<AxiosResponse<T, any>> => {
  const response = await axios.post<T>(
    `http://localhost:3001/api/v1${endpoint}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
