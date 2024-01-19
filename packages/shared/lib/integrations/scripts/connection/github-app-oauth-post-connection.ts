import type { InternalNango as Nango } from './connection.manager.js';

export default async function execute(nango: Nango) {
    const response = await nango.proxy({
        endpoint: `/user`
    });

    if (!response || !response.data) {
        return;
    }

    const handle = response.data.login;

    const connection = await nango.getConnection();

    await nango.updateConnectionConfig({ handle, userCredentials: connection.credentials });
}