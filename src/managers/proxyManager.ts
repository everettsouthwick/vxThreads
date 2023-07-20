import { ConfigManager } from './configManager';

export class ProxyManager {
    private static instance: ProxyManager;
    private index: number;

    private constructor() {
        this.index = 0;
    }

    static getInstance(): ProxyManager {
        if (!ProxyManager.instance) {
            ProxyManager.instance = new ProxyManager();
        }
        return ProxyManager.instance;
    }

    getNextProxy(): string {
        const proxies = ConfigManager.getInstance().getProxies();
        const proxy = proxies[this.index];
        this.index = (this.index + 1) % proxies.length;
        return proxy;
    }
}
