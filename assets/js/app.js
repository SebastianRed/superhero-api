const API_URL = 'https://www.superheroapi.com/api.php/4447838745259269';

const btnBuscar = document.getElementById('search');

btnBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    if(validarId()) {
        let id = parseInt(document.getElementById('superhero-search').value);
        if(id >= 1 && id <= 731) {
            if(document.querySelector('section.info').classList.contains('d-none')) {
                document.querySelector('section.info').classList.remove('d-none');
            }
        cargarInfo(id);
        } else {
            alert('El valor ID debe estar entre 1 y 731')
            if(!document.querySelector('section.info').classList.contains('d-none')) {
                document.querySelector('section.info').classList.add('d-none');
            }
        }
    }
});

let validarId = () => {
    let id = parseInt(document.getElementById('superhero-search').value);
    if(Number.isInteger(id)) {
        return true;
    } else {
        alert('Debe ingresar un valor numérico')
        if(!document.querySelector('section.info').classList.contains('d-none')) {
            document.querySelector('section.info').classList.add('d-none');
        }
        return false;
    }
}

const cargarInfo = (id) => {
    fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('name').innerHTML = data.name;
        document.getElementById('full-name').innerHTML = data.biography['full-name'];
        document.getElementById('place-of-birth').innerHTML = data.name;
        document.getElementById('gender').innerHTML = data.appearance.gender;
        document.getElementById('race').innerHTML = data.appearance.race;
        document.getElementById('height').innerHTML = data.appearance.height[1];
        document.getElementById('weight').innerHTML = data.appearance.weight[1];
        document.getElementById('occupation').innerHTML = data.work.occupation;
        document.getElementById('base').innerHTML = data.work.base;
        document.getElementById('image').src = data.image.url;
        powerstats(data.powerstats);
    })
    .catch(e => console.log(e));
}

const powerstats = (stats) => {
    let intelligence = parseInt(stats.intelligence);
    let strength = parseInt(stats.strength);
    let speed = parseInt(stats.speed);
    let durability = parseInt(stats.durability);
    let power = parseInt(stats.power);
    let combat = parseInt(stats.combat);
	var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
		title:{
			text: "Powerstats"              
		},
		data: [              
		{
			type: "area",
            markerSize: 15,
            markerBorderColor : "#000000",
            fillOpacity: .2,
            color: "#FF0000",
			dataPoints: [
				{ label: "Inteligencia", y: intelligence },
				{ label: "Fuerza", y: strength },
				{ label: "Velocidad", y: speed },
				{ label: "Durabilidad", y: durability },
                { label: "Poder", y: power },
				{ label: "Combate", y: combat }
			]
		}
		]
	});
	chart.render();
}