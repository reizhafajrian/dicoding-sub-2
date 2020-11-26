const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJAnUhbabyMoTtHRrLPmWhPKQaN_f8sfS4BDNobqSEYigIbxknA1szbdNqYZYzBkj9ctcg_IwroBrM4qexpqdWg",
   "privateKey": "knP2UeegojkSVhJWh0Xr7Z8MPZn6EDHbAsnQ_4cJNrg"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dbOGib3_QzI:APA91bGp_l9gF1QFav7Upmk_0F0ZidWjHNncuTKhHSPSfWoLmUJZuvNBhIJiDtBxkUh37j7_1JVK4m66rIEOwktQdr1T70aq6PBkvVmQBfgS9OvNEVI9g4SEcYdfA7JMwF8mkXydLulU",
   "keys": {
    "p256dh": "BB2PEQFWJWxR8bbTAhHXTJKsSnVXyoUKIjAJBXyoO/Or6/SUR9aufdTs1at8+ubNexk6t604ZcJbtdUACMCNC5Q=",
    "auth": "Hy0jPyeiQ0ppl3Ujl8T26A=="
   }
};
let payload = 'Selamat datang di Liga Inggris Web';
 
const options = {
   gcmAPIKey: '991213906493',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);