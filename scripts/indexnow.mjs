// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver…) that pages changed,
// so new releases are picked up in minutes instead of on the next crawl.
// Run after a deploy is live:
//
//   node scripts/indexnow.mjs            # every URL in the live sitemap
//   node scripts/indexnow.mjs /releases  # just these paths
//
// The key is public by design: IndexNow verifies it by fetching /<key>.txt.
const SITE = 'https://localhousellm.com';
const KEY = '542520c9aaa07ce023d7ecf5a3620947';

const paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => new URL(p, SITE).href);
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URLs → HTTP ${res.status}`);
// 200/202 = accepted. 403 means the key file is not live yet; anything else is not worth failing a deploy over.
if (res.status === 403) process.exitCode = 1;
