import Cookies from 'js-cookie'
import { BuildingCard } from '../../typesDefs/constants/app/buildings/buildings.types';

/* eslint-disable @typescript-eslint/no-explicit-any */
class BackendFetching {
  decryptKey?: string;
  localRequestValidator?: string;
  baseApiUrl?: string;
  backendApiUrl?: string;

  constructor() {
    this.decryptKey = process.env.DECRYPT_KEY;
    this.localRequestValidator = process.env.LOCAL_REQUEST_VALIDATOR;
    this.baseApiUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_APP_LOCAL_BACKEND_API
        : process.env.NEXT_PUBLIC_APP_PROD_BACKEND_API;
    this.backendApiUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_APP_LOCAL_BACKEND_API + '/api'
        : process.env.NEXT_PUBLIC_APP_PROD_BACKEND_API + '/api';
  }

  httpCallable(url: string): (configs: RequestInit) => Promise<Response> {
    return async (configs: any) =>
      await fetch(this.backendApiUrl + url, {
        ...configs,
        headers: !configs.noContentType
          ? {
              'Content-Type': 'application/json',
              ...configs?.headers
            }
          : { ...configs?.headers }
      });
  }

  httpAuthenticatedCallable(url: string): (configs: RequestInit) => Promise<Response> {
    const accessToken = Cookies.get('accessToken')
    
    return async (configs: any) =>
      await fetch(this.backendApiUrl + url, {
        ...configs,
        headers: !configs.noContentType
          ? {
              'Content-Type': 'application/json',
              ...configs?.headers,
              'Authorization': 'Bearer ' + accessToken,
            }
          : { ...configs?.headers }
      });
  }

  //files handlers

  imageHandler(filename: string, container: string): string {
    return this.baseApiUrl + '/public/assets/images' + container + filename;
  }

  pdfHandler(filename: string, container: string): string {
    return this.baseApiUrl + '/public/assets/files/' + container + filename;
  }

  /**
   * home endpoints
   */

  async getAllBuildings(filters?: string) {
    const url = '/buildings' + (filters ?? '');
    return await this.httpCallable(url)({
      mode: 'cors',
      method: 'GET'
    });
  }

  async getBuildingById(projectId: string) {
    return await this.httpCallable('/buildings/' + projectId)({
      mode: 'cors',
      method: 'GET'
    });
  }

  async createBuilding(body: any) {
    return await this.httpAuthenticatedCallable('/buildings')({
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body
    });
  }

  async updateBuildingById(projectId: string, body: Partial<BuildingCard>) {
    return await this.httpAuthenticatedCallable('/buildings/' + projectId)({
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  async deleteBuildingById(projectId: string) {
    return await this.httpAuthenticatedCallable('/buildings/' + projectId)({
      mode: 'cors',
      method: 'DELETE'
    });
  }

  async authUser(email: string, password: string){
    const url = '/users/login';
    return await this.httpCallable(url)({
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    });
  }  
}

export default BackendFetching;
