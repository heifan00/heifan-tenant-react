import axiosInstance from './AxiosInstance';

export const login = async (account, password) => {
  try {
    const response = await axiosInstance.post('/api/tenant/login', {
      account,
      password,
    });
    return response.data; // 返回服务器返回的数据
  } catch (error) {
    throw error; // 抛出错误以便调用者可以处理
  }
};