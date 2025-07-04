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
      <strong>Paciente:</strong> ${c.paciente} <br>
      <strong>Médico:</strong> ${c.medico} <br>
      <strong>Data:</strong> ${new Date(c.data).toLocaleString()} <br>
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
  const novoPaciente = prompt('Novo nome do paciente:', consulta.paciente);
  const novoMedico = prompt('Novo nome do médico:', consulta.medico);
  const novaData = prompt('Nova data (formato: yyyy-mm-ddThh:mm):', consulta.data);

  if (novoPaciente && novoMedico && novaData) {
    consulta.paciente = novoPaciente;
    consulta.medico = novoMedico;
    consulta.data = novaData;
    renderConsultas();
  }
}
