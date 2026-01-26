class StorageService {
    private static instance: StorageService;

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    public setLocalItem(key: Key, value: string) {
        return localStorage.setItem(key, value);
    }

    public getLocalItem(key: Key) {
        return localStorage.getItem(key);
    }
}

type Key = "warmed_at";

export const storage = StorageService.getInstance();