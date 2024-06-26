import type { ProxyConfiguration, GetRecordsRequestConfig } from './types.js';

/**
 * Validates the configuration for a proxy call
 * @param config - Configuration object for the proxy call
 * @throws If required parameters are missing in the configuration
 */
export const validateProxyConfiguration = (config: ProxyConfiguration) => {
    const requiredParams: (keyof ProxyConfiguration)[] = ['endpoint', 'providerConfigKey', 'connectionId'];

    requiredParams.forEach((param) => {
        if (typeof config[param] === 'undefined') {
            throw new Error(`${param} is missing and is required to make a proxy call!`);
        }
    });
};

/**
 * Validates the configuration for fetching sync records
 * @param config - Configuration object for fetching sync records
 * @throws If required parameters are missing in the configuration
 */
export const validateSyncRecordConfiguration = (config: GetRecordsRequestConfig) => {
    const requiredParams: (keyof GetRecordsRequestConfig)[] = ['model', 'providerConfigKey', 'connectionId'];

    requiredParams.forEach((param) => {
        if (typeof config[param] === 'undefined') {
            throw new Error(`${param} is missing and is required to make a proxy call!`);
        }
    });
};
