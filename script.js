const IV = 31;
let baseStats = {};
let pokemonList = [];
let team = new Array(6).fill(null);

const typeColors = {
fire:'#EE8130', water:'#6390F0', grass:'#7AC74C',
electric:'#F7D02C', ice:'#96D9D6', fighting:'#C22E28',
poison:'#A33EA1', ground:'#E2BF65', flying:'#A98FF3',
psychic:'#F95587', bug:'#A6B91A', rock:'#B6A136',
ghost:'#735797', dragon:'#6F35FC', dark:'#705746',
steel:'#B7B7CE', fairy:'#D685AD', normal:'#A8A77A'
};

const statsOrder = ['hp','atk','def','spa','spd','spe'];

const natures = [
['Hardy','none','none'],['Lonely','atk','def'],['Brave','atk','spe'],
['Adamant','atk','spa'],['Naughty','atk','spd'],
['Bold','def','atk'],['Docile','none','none'],['Relaxed','def','spe'],
['Impish','def','spa'],['Lax','def','spd'],
['Timid','spe','atk'],['Hasty','spe','def'],['Serious','none','none'],
['Jolly','spe','spa'],['Naive','spe','spd'],
['Modest','spa','atk'],['Mild','spa','def'],['Quiet','spa','spe'],
['Bashful','none','none'],['Rash','spa','spd'],
['Calm','spd','atk'],['Gentle','spd','def'],['Sassy','spd','spe'],
['Careful','spd','spa'],['Quirky','none','none']
];

const items = [
'Choice Band','Choice Specs','Choice Scarf','Life Orb',
'Focus Sash','Leftovers','Assault Vest','Mystic Water',
'Charcoal','Magnet','Never-Melt Ice','Black Glasses','Soft Sand'
];

const pokemonInput = document.getElementById('pokemonInput');
const suggestions = document.getElementById('pokemonSuggestions');
const sprite = document.getElementById('sprite');

fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
.then(r=>r.json())
.then(d=>pokemonList = d.results.map(p=>p.name));

pokemonInput.addEventListener('input', e=>{
let val = e.target.value.toLowerCase();
suggestions.innerHTML='';
if(!val) return;
pokemonList.filter(p=>p.includes(val)).slice(0,8).forEach(p=>{
let div=document.createElement('div');
div.textContent=p;
div.onclick=()=>selectPokemon(p);
suggestions.appendChild(div);
});
});

function selectPokemon(name){
pokemonInput.value=name;
suggestions.innerHTML='';
fetch('https://pokeapi.co/api/v2/pokemon/'+name)
.then(r=>r.json())
.then(data=>{
sprite.src=data.sprites.front_default;
baseStats={};
data.stats.forEach(s=>baseStats[s.stat.name]=s.base_stat);
updateAll();
});
}
