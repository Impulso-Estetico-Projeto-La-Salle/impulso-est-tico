function carregarClientes() {
  fetch("http://localhost:3000/api/clientes")
    .then(res => res.json())
    .then(clientes => {

      const container = document.getElementById("clientes");
      container.innerHTML = "";

      clientes.forEach(c => {
        container.innerHTML += `
          <div class="card">
            <h3>${c.nome}</h3>
            <p>Email: ${c.email || "sem email"}</p>
            <p>Telefone: ${c.telefone || "sem telefone"}</p>
          </div>
        `;
      });

    })
    .catch(err => console.log(err));
}

function criarCliente() {
  fetch("http://localhost:3000/api/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value
    })
  })
  .then(() => {
    alert("Cliente criado!");
    carregarClientes();
  });
}


function carregarAgendamentos() {
  fetch("http://localhost:3000/api/agendamentos")
    .then(res => res.json())
    .then(data => {

      const container = document.getElementById("agendamentos");
      container.innerHTML = "";

      data.forEach(a => {

        const div = document.createElement("div");
        div.classList.add("card");

        const dataFormatada = new Date(a.data_hora).toLocaleString("pt-BR");
        console.log(a);
        div.innerHTML = `
          <h3>💆‍♀️ ${a.cliente?.nome || "Cliente"}</h3>
          <p>📅 ${dataFormatada}</p>
          <p>📌 Status: <strong>${a.status}</strong></p>

          <button class="btn-primary" onclick="mudarStatus(${a.id}, 'confirmado')">
            Confirmar
          </button>

          <button class="btn-secondary" onclick="mudarStatus(${a.id}, 'concluido')">
            Concluir
          </button>

          <button class="btn-danger" onclick="mudarStatus(${a.id}, 'cancelado')">
            Cancelar
          </button>
        `;

        container.appendChild(div);
      });

    });
}


function criarAgendamento() {
  fetch("http://localhost:3000/api/agendamentos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cliente_id: document.getElementById("cliente_id").value,
      procedimento_id: document.getElementById("procedimento_id").value,
      data_hora: document.getElementById("data_hora").value
    })
  })
  .then(() => {
    alert("Agendamento criado!");
    carregarAgendamentos();
  });
}


function mudarStatus(id, status) {
  fetch(`http://localhost:3000/api/agendamentos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  })
  .then(() => carregarAgendamentos());
}


function carregarDashboard() {
  fetch("http://localhost:3000/api/dashboard")
    .then(res => res.json())
    .then(d => {

      const container = document.getElementById("dashboard");
      container.innerHTML = `
        <div class="card">
          <h3>✨ Atendimentos</h3>
          <p>${d.total_atendimentos}</p>
        </div>

        <div class="card">
          <h3>📅 Semana</h3>
          <p>${d.agendamentos_semana}</p>
        </div>

        <div class="card">
          <h3>❌ Cancelamentos</h3>
          <p>${d.taxa_cancelamento.percentual}%</p>
        </div>
      `;

      d.servicos_mais_procurados.forEach(s => {
        container.innerHTML += `
          <div class="card">
            <h3>💖 ${s.nome}</h3>
            <p>${s.total} atendimentos</p>
          </div>
        `;
      });

    });
}

function carregarProcedimentos() {
  fetch("http://localhost:3000/api/procedimentos")
    .then(res => res.json())
    .then(data => {

      const container = document.getElementById("procedimentos");
      container.innerHTML = "";

      data.forEach(p => {
        container.innerHTML += `
          <div class="card">
            <h3>${p.nome}</h3>
            <p>${p.descricao || "sem descrição"}</p>
            <p>R$ ${p.preco}</p>
          </div>
        `;
      });

    });
}

carregarClientes();
carregarAgendamentos();
carregarDashboard();
carregarProcedimentos();