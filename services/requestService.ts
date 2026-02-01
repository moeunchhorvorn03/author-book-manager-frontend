import axios from "axios";
import { storage } from "./storageService";

class RequestService {
    private static instance: RequestService;
    private url: string = process.env.VITE_API_URL;

    public static getInstance(): RequestService {
        if (!RequestService.instance) {
            RequestService.instance = new RequestService();
        }
        return RequestService.instance;
    }

    public login(body: any = {}): Promise<any> {
        return this.get('api/auth/login', body, { method: 'POST' });
    }

    public get(endpoint: string, body: any = {}, options?: { method?: string }): Promise<any> {
        const method = options?.method || 'POST';
        const config = {
            data: body,
            url: `${this.url}/${endpoint}`,
        };
        return axios({
            headers: this.getHeaders(),
            method,
            ...config,
        })
            .then(response => response.data)
            .catch(error => {
                if (axios.isAxiosError(error) && error.response) {
                    throw new Error(error.response.data?.message || 'Failed to fetch books');
                }
                throw new Error('Failed to fetch books');
            });
    }

    private getHeaders(): Record<string, string> {
        return {
            ContentType: 'application/json',
            Authorization: storage.getLocalItem("token") ? `Bearer ${storage.getLocalItem("token")}` : ''
        }
    }
}

export const request = RequestService.getInstance();