export default {
    async email(message, env, _ctx) {
        const start = Date.now();
        const response = await fetch(`${env.WEBHOOK_URL}/webhook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'message/rfc822',
                Authorization: `Bearer ${env.WEBHOOK_SECRET}`
            },
            body: message.raw
        });

        if (!response.ok) {
            const body = await response.text().catch(() => '<unable to get body text>');
            console.error(`Webhook returned ${response.status} ${response.statusText}: ${body}`);

            message.setReject(`Failed to forward email from ${message.from} to ${message.to}`);
            return;
        }

        console.info(`Email from ${message.from} to ${message.to} forwarded successfully. Took ${Date.now() - start}ms`);
    }
};
