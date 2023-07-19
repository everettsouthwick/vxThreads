import * as fs from 'fs';
import * as path from 'path';

interface Config {
    proxies: string[];
}

export class ProxyManager {
    private config: Config;
    private index: number;

    constructor() {
        this.config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf-8'));
        this.index = 0;
    }

    getNextProxy(): string {
        const proxy = this.config.proxies[this.index];
        this.index = (this.index + 1) % this.config.proxies.length;
        return proxy;
    }
}
