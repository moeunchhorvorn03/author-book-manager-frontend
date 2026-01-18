class RequestService {
    private static instance: RequestService;
    private url: string = (import.meta as any).env.VITE_API_URL;

    public static getInstance(): RequestService {
        if (!RequestService.instance) {
            RequestService.instance = new RequestService();
        }
        return RequestService.instance;
    }

    public get(endpoint: string): Promise<any> {
        return fetch(`${this.url}/${endpoint}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            return response.json();
        });
    }
}

export const request = RequestService.getInstance();