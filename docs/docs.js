addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const urlObject = new URL(request.url);
    // If the request is to the configured docs path
    if (urlObject.pathname === "/docs" || urlObject.pathname.startsWith("/docs/")) {
      // Then Proxy to Mintlify
      const DOCS_URL = "awdev-347a591f.mintlify.site";
      const CUSTOM_URL = "awdev.eu.org";

      let url = new URL(request.url);
      url.hostname = DOCS_URL;

      let proxyRequest = new Request(url, request);

      proxyRequest.headers.set("Host", DOCS_URL);
      proxyRequest.headers.set("X-Forwarded-Host", CUSTOM_URL);
      proxyRequest.headers.set("X-Forwarded-Proto", "https");

      return await fetch(proxyRequest);
    }
  } catch (error) {
    // if no action found, play the regular request
    return await fetch(request);
  }

  return await fetch(request);
}
