import { ContactFormRequest } from '../../typesDefs/constants/app/contactForm/types';

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
    const url = '/projects' + (filters ?? '');
    return await this.httpCallable(url)({
      mode: 'cors',
      method: 'GET'
    });
  }

  async getBuildingById(projectId: string) {
    return await this.httpCallable('/projects/' + projectId)({
      mode: 'cors',
      method: 'GET'
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
