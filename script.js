const form = document.getElementById('consulta-form');
const lista = document.getElementById('lista-consultas');

let consultas = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const paciente = document.getElementById('paciente').value;
  const medico = document.getElementById('medico').value;
  const data = document.getElementById('data').value;

  const consulta = {
    id: Date.now(),
    paciente,
    medico,
    data
  };

  consultas.push(consulta);
  form.reset();
  renderConsultas();
});

function renderConsultas() {
  lista.innerHTML = '';
  consultas.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p><strong>Paciente:</strong> ${c.paciente} </p>
      <p><strong>Médico:</strong> ${c.medico} </p> 
      <p><strong>Data:</strong> ${new Date(c.data).toLocaleString()} </p> 
      <button onclick="editarConsulta(${c.id})" class="edit">Reagendar</button>
      <button onclick="removerConsulta(${c.id})">Cancelar</button>
    `;
    lista.appendChild(li);
  });
}

function removerConsulta(id) {
  consultas = consultas.filter(c => c.id !== id);
  renderConsultas();
}

function editarConsulta(id) {
  const consulta = consultas.find(c => c.id === id);
  if (!consulta) return;

  document.getElementById('edit-id').value = consulta.id;
  document.getElementById('edit-paciente').value = consulta.paciente;
  document.getElementById('edit-medico').value = consulta.medico;
  document.getElementById('edit-data').value = consulta.data;

  document.getElementById('modal').classList.remove('hidden');
}

document.getElementById('cancelar-btn').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('editar-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = Number(document.getElementById('edit-id').value);
  const paciente = document.getElementById('edit-paciente').value;
  const medico = document.getElementById('edit-medico').value;
  const data = document.getElementById('edit-data').value;

  const consulta = consultas.find(c => c.id === id);
  if (consulta) {
    consulta.paciente = paciente;
    consulta.medico = medico;
    consulta.data = data;
  }

  document.getElementById('modal').classList.add('hidden');
  renderConsultas();
});