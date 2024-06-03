import axiosInstance from './AxiosInstance';

const currentPage = 1;
const pageSize = 10;
const keyword = '';
const startTime = null; // 根据需要设置为具体日期  
const endTime = null; // 根据需要设置为具体日期 

export const tenantList = async (currentPage, pageSize, keyword, startTime, endTime) => {
  try {
    const response = await axiosInstance.get('/api/tenant', {
        currentPage, pageSize, keyword, startTime, endTime
    });
    return response.data.data; // 返回服务器返回的数据
  } catch (error) {
    throw error; // 抛出错误以便调用者可以处理
  }
};