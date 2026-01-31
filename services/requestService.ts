import axios from "axios";

class RequestService {
    private static instance: RequestService;
    private url: string = process.env.VITE_API_URL;
    private headers = { 'Content-Type': 'application/json' };

    public static getInstance(): RequestService {
        if (!RequestService.instance) {
            RequestService.instance = new RequestService();
        }
        return RequestService.instance;
    }

    public get(endpoint: string, body: any = {}, options?: { method?: string }): Promise<any> {
        const method = options?.method || 'POST';
        const config = {
            data: body,
            url: `${this.url}/${endpoint}`,
        };
        return axios({
            headers: this.headers,
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
}

export const request = RequestService.getInstance();