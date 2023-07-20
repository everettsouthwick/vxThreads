import * as fs from 'fs';
import * as path from 'path';

interface Config {
    port: number;
    proxies: string[];
}

export class ConfigManager {
    private static instance: ConfigManager;
    private config: Config;

    private constructor() {
        this.config = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, '../config.json'), 'utf-8'),
        );
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    getPort(): number {
        return this.config.port;
    }

    getProxies(): string[] {
        return this.config.proxies;
    }
}
