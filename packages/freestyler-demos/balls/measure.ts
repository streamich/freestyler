const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file:///Users/vadimdaleckis/dev/freestyler/packages/freestyler-demos/balls/html/index.html');
    await page.screenshot({path: 'example.png'});

    console.log(await page.metrics());

    await page._client.send('Performance.enable');
    const response = await page._client.send('Performance.getMetrics');
    console.log(response);

    await page._client.send('Animation.enable');
    const response2 = await page._client.send('Animation.getPlaybackRate');
    console.log(response2);

    await browser.close();
})();
