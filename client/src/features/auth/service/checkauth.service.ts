import { apiService } from '@core/services/api.service';

export async function checkAuth() {
  const [error, data] = await apiService.get('/user');
  console.log('dato', data);
  if (error) {
    return null;
  }

  return data;
}
