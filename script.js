
const SUPABASE_URL = "https://mlfhuavkrjuekmjznxgy.supabase.co";

const SUPABASE_KEY = "sb_publishable_WexlLc3SUJK2IgoBxYfRHA_jLB3AUsM";

const ADMIN_PASSWORD = "Brunodabundaproth";

const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const $ = id => document.getElementById(id);

// ENVIAR INSCRIÇÃO
$("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = $("send");
  const message = $("message");
  const data = new FormData(e.target);

  const inscricao = {
    nickname: data.get("nick").trim(),
    genero: data.get("gender"),
    horario: data.get("schedule").trim(),
    politica: data.get("politics"),
    observacao: data.get("notes").trim()
  };

  button.disabled = true;
  message.textContent = "Enviando inscrição...";

  try {
    const { error } = await db
      .from("inscricoes")
      .insert([inscricao]);

    if (error) throw error;

    e.target.reset();
    message.textContent = "Inscrição enviada com sucesso! 🐋";

  } catch (error) {
    console.error(error);
    message.textContent = "Erro ao enviar inscrição.";
  }

  button.disabled = false;
});

// ABRIR PAINEL
$("openPanel").onclick = () => {
  $("modal").classList.remove("hidden");
  $("login").classList.remove("hidden");
  $("dashboard").classList.add("hidden");
};

$("close").onclick = () => {
  $("modal").classList.add("hidden");
};

// LOGIN
$("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if ($("password").value !== ADMIN_PASSWORD) {
    $("loginMessage").textContent = "Senha incorreta!";
    return;
  }

  $("login").classList.add("hidden");
  $("dashboard").classList.remove("hidden");

  await carregarInscricoes();
});

// CARREGAR INSCRIÇÕES
async function carregarInscricoes() {
  const entries = $("entries");

  entries.replaceChildren();
  $("count").textContent = "Carregando...";

  const { data, error } = await db
    .from("inscricoes")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error(error);
    $("count").textContent = "Erro ao carregar inscrições.";
    return;
  }

  $("count").textContent =
    data.length + " participante(s)";

  if (data.length === 0) {
    entries.textContent = "Nenhuma inscrição recebida.";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "entry";

    const title = document.createElement("strong");
    title.textContent = item.nickname;
    card.appendChild(title);

    const campos = [
      "Gênero: " + item.genero,
      "Horário: " + item.horario,
      "Política: " + item.politica,
      "Observações: " + (item.observacao || "Nenhuma"),
      "Data: " + new Date(item.criado_em).toLocaleString("pt-BR")
    ];

    campos.forEach(texto => {
      const p = document.createElement("p");
      p.textContent = texto;
      card.appendChild(p);
    });

    entries.appendChild(card);
  });
}

// ATUALIZAR E SAIR
$("refresh").onclick = carregarInscricoes;

$("logout").onclick = () => {
  $("dashboard").classList.add("hidden");
  $("login").classList.remove("hidden");
  $("password").value = "";
};
               
