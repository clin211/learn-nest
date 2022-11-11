import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';

const YML_CONFIG_FILE_PATH = `${process.cwd()}/config/config.yml`;
const COMMON_CONFIG_FILE = yaml.load(
    readFileSync(YML_CONFIG_FILE_PATH, 'utf8'),
);

const envPath = yaml.load(
    readFileSync(
        `${process.cwd()}/config/config.${
            process.env.NODE_ENV || 'development'
        }.yml`,
        'utf8',
    ),
);
export default () => {
    return _.merge(COMMON_CONFIG_FILE, envPath);
};
