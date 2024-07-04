import { ApiResponse } from '../../response/api-response.response';
import { ApiError } from '../errors/custom-error-classes';

export function handleResponse<T>(response: ApiResponse<T>): T {
  if (response.status >= 200 && response.status < 300) {
    console.debug(`data: ${JSON.stringify(response.data)}`);
    return response.data;
  } else {
    throw new ApiError(response.status, response.message);
  }
}