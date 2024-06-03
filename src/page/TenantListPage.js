import React, { useEffect, useState } from 'react';
import { tenantList } from '../api/TenantApi';

const TenantListPage = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentPage = 1;
  const pageSize = 10;
  const keyword = '';
  const startTime = null; // 根据需要设置为具体日期  
  const endTime = null; // 根据需要设置为具体日期 

  useEffect(() => {
    fetchData();
  }, []); // 空数组作为依赖项，表示该effect只会在组件挂载时运行  

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await tenantList(currentPage, pageSize, keyword, startTime, endTime);
      setTenants(data.list);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>List of Items</h2>
      <table>
        <thead>
          <tr>
            <th>租户账号</th>
            <th>租户全称</th>
            <th>公司名称</th>
            <th>描述</th>
            <th>创建时间</th>
            <th>过期时间</th>
            <th>操作</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.enCode}</td>
              <td>{tenant.fullName}</td>
              <td>{tenant.companyName}</td>
              <td>{tenant.description}</td>
              <td>{tenant.creatorTime}</td>
              <td>{tenant.expiresTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantListPage;