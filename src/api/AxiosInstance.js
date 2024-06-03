import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:30006', // 设置你的基础URL  
  timeout: 1000, // 还可以设置其他默认选项，如超时时间  
  // ... 其他Axios配置选项  
  withCredentials: true,
});

// 配置响应拦截器  
instance.interceptors.response.use(  
  (response) => {  
    // 检查响应的数据结构  
    // 假设你的响应体是一个对象，其中包含一个data属性，data属性又包含一个code属性  
    // 这里我们检查code是否为200，如果是则直接返回data属性中的数据  
    if (response.data && response.data.data && response.data.data.code === 200) {  
      // 200表示成功  
      return response.data.data; // 返回实际的数据，而不是整个响应对象  
    } else {  
      // 如果不是200，我们创建一个错误对象并传递给下一个处理函数  
      const error = new Error('服务器返回了非200状态码');  
      error.response = response; // 附加原始的响应对象到错误对象上  
      return Promise.reject(error); // 拒绝Promise以便调用者可以捕获错误  
    }  
  },  
  (error) => {  
    // 这里处理网络错误或请求被服务器拒绝的情况  
    handleAxiosError(error); // 调用统一的错误处理函数  
    return Promise.reject(error); // 拒绝Promise以便调用者可以捕获错误  
  }  
);  

// 统一的错误处理函数  
function handleAxiosError(error) {
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内  
    const { code, data } = error.response;
    console.error('服务器响应错误:', error.response);
    // 根据不同的状态码处理错误  
    console.error('服务器响应错误:', error.response);
    switch (code) {
      case 400:
        // 客户端错误，比如参数错误  
        if (data && data.message) {
          toast.error(data.message); // 显示具体的错误消息  
        } else {
          toast.error('客户端请求错误，请检查你的输入');
        }
        break;
      case 600:
        // 登录异常  
        if (data && data.message) {
          toast.error('登录异常: ' + data.message); // 显示登录异常的具体消息  
        } else {
          toast.error('登录异常，请检查你的账号和密码');
        }
        break;
      default:
        // 其他非200状态码  
        if (data && data.message) {
          toast.error(data.message);
        } else {
          toast.error(`请求失败，状态码: ${code}`);
        }
    }
  } else if (error.request) {
    // 请求已发出，但没有收到响应  
    toast.error('请求已发送，但没有收到响应');
  } else {
    // 发生了某些问题导致请求不能发送  
    toast.error('请求失败，请检查你的网络连接');
  }
  // 这里不再抛出错误，因为我们已经处理了错误并通过toast显示了消息  
  // 如果调用者需要知道错误，可以通过Promise的catch捕获  

}


export default instance;