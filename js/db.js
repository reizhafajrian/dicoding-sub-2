const dbPromised = idb.open('team', 1, upgradeDb => {
    const teamObjectStore = upgradeDb.createObjectStore('teamFavo', {
      keyPath: 'id'
    });
    teamObjectStore.createIndex('namaTeam', 'name', { unique: false});
  });
  
  function SaveTeam(data) {
    dbPromised.then(function(db) {
        const tx = db.transaction('teamFavo', 'readwrite');
        const store = tx.objectStore('teamFavo');
        const dataSave = {  
                id: data.id,
                name: data.name,
                address: data.address,
                crestUrl : data.crestUrl,
  
          };
         tx.objectStore('teamFavo').put(dataSave);
          return tx.complete;
    }).then(function() {
        //console.log('Team Favorit berhasil disimpan.');
         var title = `Save to favorite  ${data.name}`;
              var options = {
                  'body': `${data.name} ${data.email}`
              }
              if (Notification.permission === 'granted') {
                  navigator.serviceWorker.ready.then(function(registration) {
                      registration.showNotification(title, options);
                  });
              } else {
                  console.error('notifkasi denied');
              }
    }).catch(function(err) {
        console.log(err);
    })
  }

  function deleteTeam(data) {
     dbPromised.then(function(db) {
        var tx = db.transaction('teamFavo', 'readwrite');
        var store = tx.objectStore('teamFavo');
        console.log(store)
        store.delete(data);
        return tx.complete;
    }).then(function() {
       var title = `favotite di hapus`;
          
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification(title);
            });
        } else {
            console.error('notifkasi denied');
        }
    }).catch(function(err) {
        console.log(err);
    })
  }
  
  function showAllDataFavorite() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction('teamFavo', "readonly");
                var store = tx.objectStore('teamFavo');
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
  }