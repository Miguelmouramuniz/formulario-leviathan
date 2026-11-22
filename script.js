
const SUPABASE_URL = "https://mlfhuavkrjuekmjznxgy.supabase.co";

const SUPABASE_KEY = "sb_publishable_WexlLc3SUJK2IgoBxYfRHA_jLB3AUsM";

const ADMIN_PASSWORD = "Brunodabundaproth";

// Conexão com Supabase
const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const $ = id => document.getElementById(id);

// Elementos
const form = $("form");
const message = $("message");
const send = $("send");

const modal = $("modal");
const dashboard = $("dashboard");

const openPanel = $("openPanel");
const close = $("close");

const loginForm = $("loginForm");
const password = $("password");
const loginMessage = $("loginMessage");

const count = $("count");
const entries = $("entries");

const refresh = $("refresh");
const logout = $("logout");

// ENVIAR INSCRIÇÃO
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  send.disabled = true;
  send.textContent = "Enviando...";

  message.textContent = "";

  try {
    const dados = new FormData(form);

    const inscricao = {
      nickname: dados.get("nick")?.trim(),
      genero: dados.get("gender"),
      horario: dados.get("schedule")?.trim(),
      politica: dados.get("politics"),
      observacao: dados.get("notes")?.trim() || null
    };

    if (
      !inscricao.nickname ||
      !inscricao.genero ||
      !inscricao.horario ||
      !inscricao.politica
    ) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const { error } = await db
      .from("inscricoes")
      .insert([inscricao]);

    if (error) throw error;

    message.textContent = "Inscrição enviada com sucesso!";
    message.style.color = "#00ff88";

    form.reset();

  } catch (erro) {
    console.error("Erro ao enviar inscrição:", erro);

    message.textContent =
      "ERRO: " + (erro.message || JSON.stringify(erro));

    message.style.color = "#ff4444";

  } finally {
    send.disabled = false;
    send.textContent = "Enviar inscrição";
  }
});

// ABRIR PAINEL
openPanel.addEventListener("click", () => {
  modal.style.display = "flex";
});

// FECHAR PAINEL
close.addEventListener("click", () => {
  modal.style.display = "none";
});

// LOGIN
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (password.value === ADMIN_PASSWORD) {
    loginMessage.textContent = "Acesso permitido!";
    loginMessage.style.color = "#00ff88";

    await carregarInscricoes();

    modal.style.display = "none";
    dashboard.style.display = "block";

    password.value = "";
  } else {
    loginMessage.textContent = "Senha incorreta!";
    loginMessage.style.color = "red";
  }
});

// CARREGAR INSCRIÇÕES
async function carregarInscricoes() {
  entries.innerHTML = "Carregando inscrições...";

  try {
    const { data, error } = await db
      .from("inscricoes")
      .select("*")
      .order("criado_em", { ascending: false });

    if (error) throw error;

    count.textContent = data.length;

    entries.innerHTML = "";

    if (data.length === 0) {
      entries.textContent = "Nenhuma inscrição encontrada.";
      return;
    }

    data.forEach((pessoa) => {
      const card = document.createElement("div");

      card.className = "entry";

      const titulo = document.createElement("h3");
      titulo.textContent = pessoa.nickname;

      const genero = document.createElement("p");
      genero.textContent = "Gênero: " + pessoa.genero;

      const horario = document.createElement("p");
      horario.textContent = "Horário: " + pessoa.horario;

      const politica = document.createElement("p");
      politica.textContent = "Opinião: " + pessoa.politica;

      const observacao = document.createElement("p");
      observacao.textContent =
        "Observação: " + (pessoa.observacao || "Nenhuma");

      card.append(titulo, genero, horario, politica, observacao);
      entries.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao carregar inscrições:", erro);

    entries.textContent =
      "Erro ao carregar: " + erro.message;
  }
}

// ATUALIZAR PAINEL
refresh.addEventListener("click", carregarInscricoes);

// SAIR DO PAINEL
logout.addEventListener("click", () => {
  dashboard.style.display = "none";
  modal.style.display = "none";
});

// FECHAR CLICANDO FORA
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
      
