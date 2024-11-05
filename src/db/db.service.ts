import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';


interface DbServiceInterface {
    read(): Promise<Record<string, any>[]>;
    write(data: Record<string, any>[]): Promise<void>;
}

@Injectable()
export class DbService implements DbServiceInterface {
    @Inject('OPTIONS')
    private options: DbModuleOptions;

    async read() {
        const filePath = this.options.path;

        try {
            await access(filePath);
            const str = await readFile(filePath, { encoding: 'utf-8' });

            if (!str) return [];

            return JSON.parse(str);
        } catch (error) {
            return [];
        }
    }

    async write(data: Record<string, any>[]) {
        await writeFile(this.options.path, JSON.stringify(data || []), { encoding: 'utf-8' });
    }
}
