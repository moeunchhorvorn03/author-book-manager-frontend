class RequestService {
    private static instance: RequestService;
    private url: string = process.env.VITE_API_URL;

    public static getInstance(): RequestService {
        if (!RequestService.instance) {
            RequestService.instance = new RequestService();
        }
        return RequestService.instance;
    }

    public get(endpoint: string, body: any = {}): Promise<any> {
        return fetch(`${this.url}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            return response.json();
        });
    }
}

export const request = RequestService.getInstance();