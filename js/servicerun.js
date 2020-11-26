
      // Periksa service worker
if (!('serviceWorker' in navigator)) {
        console.log("Service worker tidak didukung browser ini.");
      } else {
        registerServiceWorker()
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
          requestPermission();
      })
      .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
      });
      }
      // Register service worker
      function registerServiceWorker() {
        return navigator.serviceWorker.register("./service-worker.js")
          .then(function (registration) {
            console.log('Registrasi service worker berhasil.');
            return registration;
          })
          .catch(function (err) {
            console.error('Registrasi service worker gagal.', err);
          });
      }
  
      function requestPermission() {
        if ('Notification' in window) {
          Notification.requestPermission().then(function (result) {
            if (result === "denied") {
              console.log("Fitur notifikasi tidak diijinkan.");
              return;
            } else if (result === "default") {
              console.error("Pengguna menutup kotak dialog permintaan ijin.");
              return;
            }
            navigator.serviceWorker.ready.then(()=>{
            if (('PushManager' in window)) {
              navigator.serviceWorker.getRegistration().then(function (reg) {
                reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array("BJAnUhbabyMoTtHRrLPmWhPKQaN_f8sfS4BDNobqSEYigIbxknA1szbdNqYZYzBkj9ctcg_IwroBrM4qexpqdWg")
                }).then(function (sub) {
                  console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                  console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                  console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(sub.getKey('p256dh')))));
                  console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(sub.getKey('auth')))));
                }).catch(function (e) {
                  console.error('Tidak dapat melakukan subscribe ', e);
                });
  
              });
            }});
  
          });
        }
      }
    function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
        }