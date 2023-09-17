document.addEventListener('DOMContentLoaded', () => {
  // Number of States start
  const amountstatesElement = document.getElementById('amountstates');

  fetch('https://brasilapi.com.br/api/ibge/uf/v1')
    .then(response => {
      return response.json();
    })
    .then(data => {
      const states = data;
      const amountstates = states.length;
      amountstatesElement.textContent = `Total de estados: ${amountstates}`;
    });
  // Number of states finish

  // table of States start
  const statesTable = document.getElementById('statesTable').getElementsByTagName('tbody')[0];
  const statesbtt = document.getElementById('statesbtt');
  
  statesbtt.addEventListener('click', () => {
    statesTable.style.display = 'block';
    citiesTable.style.display = 'none';
    fetch('https://brasilapi.com.br/api/ibge/uf/v1')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const states = data;
        statesTable.innerHTML = ''; 
        states.forEach(state => {
          const row = statesTable.insertRow();
          const cellstate = row.insertCell(0);
          const cellUF = row.insertCell(1);
  
          cellstate.textContent = state.nome;
          cellUF.textContent = state.sigla;
        });
      });
  });
  // table of states finish

  // cities start
  const searchCitiesBtn = document.getElementById('searchCitiesBtn');
  const ufInput = document.getElementById('ufInput');

  searchCitiesBtn.addEventListener('click', searchCities);
  ufInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchCities();
    }
  });

  function searchCities() {
    const uf = ufInput.value.toUpperCase(); // Pegue o valor do campo de entrada e transforme em maiúsculas
    statesTable.style.display = 'none';
    citiesTable.style.display = 'block';
    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`)
    .then(response => {
        return response.json();
    })
    .then(data => {
      const citiesTable = document.getElementById('citiesTable').getElementsByTagName('tbody')[0];
      citiesTable.innerHTML = '';
      data.forEach(city => {
        const row = citiesTable.insertRow();
        const cellCityName = row.insertCell(0);
        const cellCityCode = row.insertCell(1);
        cellCityName.textContent = city.nome;
        cellCityCode.textContent = city.codigo_ibge;
      });
    })
    .catch(error => {
      console.error('UF with written error', error);
    });
  }
});


