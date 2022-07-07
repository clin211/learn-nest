import { join } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'yaml';

export const getEnv = () => {
    return process.env.RUNNING_ENV;
};

export const getConfig = () => {
    // 获取当前环境
    const environment = getEnv();

    // 拼接 yml 文件的路径
    const yamlPath = join(process.cwd(), `./config/.${environment}.yml`);

    // 读取文件
    const file = readFileSync(yamlPath, 'utf-8');

    // 解析配置
    const config = parse(file);

    return config;
};
