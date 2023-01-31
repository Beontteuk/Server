'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "a177100fa6d1c29d9d6e347a35c1dbc0",
"index.html": "7aa239394a54a9049a4b435aedfe5e74",
"/": "7aa239394a54a9049a4b435aedfe5e74",
"main.dart.js": "d3409cac79132ea1106819859789f636",
"favicon.png": "22918fc2c1b0e39f1ee2260134edf972",
"icons/Icon-192.png": "84da720fec5cc22227676e789d7426f5",
"icons/Icon-maskable-192.png": "84da720fec5cc22227676e789d7426f5",
"icons/Icon-maskable-512.png": "36d9f9cbc54420457361e28541a54a8b",
"icons/Icon-512.png": "36d9f9cbc54420457361e28541a54a8b",
"manifest.json": "1d0397c13b16b393aabfd0d81dc4f59e",
"assets/AssetManifest.json": "2b9925d7060ebc249fa61f2ed5627053",
"assets/NOTICES": "7432d32ff9df479eb6e1a3d68cfac2fe",
"assets/FontManifest.json": "5b2c4a16b18baf0ae3f6b722e054f322",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/fonts/Noto_Sans_KR/NotoSansKR-Bold.otf": "e2406ff1791c401bc93e73d9e44e6d2b",
"assets/fonts/Noto_Sans_KR/NotoSansKR-Regular.otf": "210989664066c01d8ffdbdf56bb773cd",
"assets/fonts/Roboto/Roboto-Regular.ttf": "8a36205bd9b83e03af0591a004bc97f4",
"assets/fonts/Roboto/Roboto-Bold.ttf": "b8e42971dec8d49207a8c8e2b919a6ac",
"assets/fonts/MaterialIcons-Regular.otf": "c356054a4a4097d22e1cb588bf2d5e50",
"assets/assets/dog.png": "9451c33db35cd2d3bb1c8b2a2ceab922",
"assets/assets/home/laptop-2620118_1920.jpg": "96e591e2d246b42d3f125e36e6b81af7",
"assets/assets/home/LOGO_rounded.png": "80896d63a8059f110c148d6872cfe1cf",
"assets/assets/home/knitting-1268932_1920.jpg": "0b7eed8ee878800ad0455022cce1c26d",
"assets/assets/home/laptop-3196481_1920.jpg": "ab7a91e5ff828d1f3cb1296c5b90cd02",
"assets/assets/home/shell-650090_1920.jpeg": "af5a8669f28f6441564e1b91b114b10a",
"assets/assets/home/closet-912694_1920.jpg": "b022ec55695a203d898962d1f9f33ae7",
"assets/assets/home/living-room-2732939_1920.jpg": "95f51ef41596d495cae0e31804717ad4",
"assets/assets/home/leaf-1453071_1920.jpg": "a758c620ab58599b3016a8067c526a3e",
"assets/assets/home/strawberries-1396330_1920.jpg": "0ede92a8671cfd84ca632242ffbfd6bf",
"assets/assets/logo/logo.png": "d125938942591cea3f873633cb0a3ea0",
"assets/assets/icons/back_arrow.svg": "dae7f9781addc9a8a43fe9dbe7125a60",
"assets/assets/icons/write_text.svg": "bafa4dadbd39b09590c19bf7801cb989",
"assets/assets/icons/write_camera.svg": "b80157d797ea73b9dbdbdbb0cb2771f9",
"assets/assets/icons/icon_Star_Half.svg": "d08b2d3cb1ffb5fbe2b17693f4b799a2",
"assets/assets/icons/pencil.svg": "ae495f1802dced27fba0022fc1db67de",
"assets/assets/icons/icon_Star_Blank.svg": "df5bf4f2f30b283034198521e6376e75",
"assets/assets/icons/write_gallery.svg": "8164fa579b7c3d630a45bc28d751bc2b",
"assets/assets/icons/icon_Star_Full.svg": "61290bd090b99fa3f705f2a42de07147",
"assets/assets/UI_Page_Splash.png": "b97b4174eb124e7ecee0451073795edb",
"assets/assets/about_us.html": "e887a95a669a6624b7cb2b087e76341a"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
