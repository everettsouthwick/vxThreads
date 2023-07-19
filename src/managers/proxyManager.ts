import { ConfigManager } from './configManager';

export class ProxyManager {
    private index: number;

    constructor() {
        this.index = 0;
    }

    getNextProxy(): string {
        const proxies = ConfigManager.getInstance().getProxies();
        const proxy = proxies[this.index];
        this.index = (this.index + 1) % proxies.length;
        return proxy;
    }
}
