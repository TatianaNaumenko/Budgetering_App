import { Auth } from "./auth";

export class CustomHttp {
   static async request(url, method = 'GET', body = null) {

      const params = {
         method: method,
         headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
         },
      };
      let token = localStorage.getItem(Auth.accessTokenKey);
      if (token) {
         params.headers['x-access-token'] = token;
      }
      if (body) {
         params.body = JSON.stringify(body);
      }
      // самое главное место тут уходит запрос на сервер методои FETCH API
      const response = await fetch(url, params);
      if (!response.ok) {
         // показатель того что access token выдохся
         if (response.status === 401) {
            const result = await Auth.processUnauthorizedResponse();
            if (result) {
               return await this.request(url, method, body)
            } else {
               return null;
            }
         }
         throw new Error(response.message);
      }
      return await response.json()

   }
}