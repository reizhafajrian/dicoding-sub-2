let base_url ="https://api.football-data.org/v2/";
const token = '65734f843de541989986816a7513a080';
const nama_liga = 'PL';

let url_klassemen = `${base_url}competitions/${nama_liga}/standings`;
let url_scorer =`${base_url}competitions/${nama_liga }/scorers?limit=20`;
let url_team =`${base_url}teams/`;

let fetchApi = url => {
  return fetch(url, {
    method: "get",
    mode: "cors",
    headers: {
      'X-Auth-Token': token
    }
  });
}
function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
  }
  function json(response) {
    return response.json();
  }
  function error(error) {
    console.log("Error : " + error);
  }
  
function getPosition() {
    if ('caches' in window) {
    caches.match(url_klassemen).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          const hasilnya=data.standings[0].table
          showPosition(hasilnya)
        });
      }
    });
  }
	fetchApi(url_klassemen)
    .then(status)
    .then(json)
    .then(function(data) {
      const hasilnya=data.standings[0].table
      showPosition(hasilnya)
    
    })
    .catch(error);
}
function getTopScore() {
  if ('caches' in window) {
  caches.match(url_scorer).then(function (response) {
    if (response) {
      response.json().then(function (data) {
        const hasil=data.scorers
        showTopScore(hasil)
      });
    }
  });
}
fetchApi(url_scorer)
  .then(status)
  .then(json)
  .then(function(data) {
    const hasil=data.scorers
    showTopScore(hasil)
  
  })
  .catch(error);
}
function showPosition(data){

  let position=``
  data.forEach(element => {
    position +=`
    <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
            <div id="image-team">
          <img src=${element.team.crestUrl} alt="" width="100px">
          <p id="nama">${element.team.name}</p>
        </div>
          <p id="id-details">${element.team.id}</p>
          <h1>Position ${element.position}</h1>
        </div>
        <div class="card-action">
        <button id="save">save</button>
        </div>
      </div>
    </div>
  </div>`
  });
    document.getElementById("create-position").innerHTML=position;
    let btnSave = document.querySelectorAll("#save");
    let nama=document.querySelectorAll("#id-details")
   

    btnSave.forEach((element,i) => {
      element.onclick=()=>{
        const data=nama[i].innerHTML
        hasil=getTeamsIdDetail(data)
        console.log(hasil)
        hasil.then(function(hasil){
          SaveTeam(hasil);
        });
      }
    });

   
  
     
}

const showTopScore=(data)=>{

  let topScore=``;
  data.forEach(element => {
    topScore +=`<div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content-topscore white-text">
                <h1>
                    ${element.player.name}
                </h1>
              <p>${element.team.name}</p>
              <p>Jumlah gol: ${element.numberOfGoals}</p>
            </div>
            <div class="card-action">
            </div>
          </div>
        </div>
      </div>`
  });
    document.getElementById("create-position-topscore").innerHTML=topScore
}




function getFavoritTeam() {
  const dataIndexDb = showAllDataFavorite();
  dataIndexDb.then(function (data) {
  console.log(dataIndexDb)
  let favtim = '';
   data.forEach(function(tim) {
       favtim +=`
    <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
            <div id="image-team">
          <img src=${tim.crestUrl.replace(/^http:\/\//i, 'https://')} alt="" width="100px">
          <p id="nama">${tim.name}</p>
        </div>
          <p id="id-details">${tim.id}</p>
          <h1> ${tim.address}</h1>
        </div>
        <div class="card-action">
        <button id="delete">delete</button>
        </div>
      </div>
    </div>
  </div>`
  ;
   });

   document.getElementById("fav-team").innerHTML = favtim;
   const btndelete=document.querySelectorAll("#delete")
   const nama=document.querySelectorAll("#id-details")
   btndelete.forEach((element,i) => {
    element.onclick=()=>{
     const data=Number(nama[i].innerHTML)
    deleteTeam(data)
    window.location.reload();
    }
  });

  });
  
}

function getTeamsIdDetail(teamid) {
    return new Promise(function (resolve, reject) {
      if ('caches' in window) {
        caches.match(url_team + teamid).then(function (response) {
          if (response) {
            response.json().then(function (data) {
              resolve(data);

            });
          }
        });
      }
      fetchApi(url_team + teamid)
        .then(status)
        .then(json)
        .then(function(data) {
          resolve(data);
        })
        .catch(error);
  });
}

