// Demonstração estática para GitHub Pages: os dados ficam neste navegador.
const ADMIN_PASSWORD = "Brunodabundaproth";
const KEY = "leviathan_public_demo_v1";
const $ = id => document.getElementById(id);
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return []}}
function save(items){localStorage.setItem(KEY,JSON.stringify(items))}

$("form").addEventListener("submit",e=>{
  e.preventDefault();
  const d=new FormData(e.currentTarget);
  const entry={
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()+Math.random())),
    nick:String(d.get("nick")||"").trim(),
    gender:String(d.get("gender")||""),
    schedule:String(d.get("schedule")||"").trim(),
    politics:String(d.get("politics")||""),
    notes:String(d.get("notes")||"").trim(),
    date:new Date().toLocaleString("pt-BR")
  };
  if(!entry.nick||!entry.gender||!entry.schedule||!entry.politics)return;
  const all=load();all.unshift(entry);save(all);e.currentTarget.reset();
  $("message").textContent="Inscrição salva neste navegador! 🐋";
});
function showLogin(){
  $("modal").classList.remove("hidden");$("login").classList.remove("hidden");
  $("dashboard").classList.add("hidden");$("password").value="";$("loginMessage").textContent="";
}
$("openAdmin").addEventListener("click",showLogin);
$("close").addEventListener("click",()=>$("modal").classList.add("hidden"));
$("modal").addEventListener("click",e=>{if(e.target===$("modal"))$("modal").classList.add("hidden")});
$("loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  if($("password").value===ADMIN_PASSWORD){
    $("login").classList.add("hidden");$("dashboard").classList.remove("hidden");render();
  }else $("loginMessage").textContent="Senha incorreta.";
});
$("logout").addEventListener("click",showLogin);
function render(){
  const all=load();$("count").textContent=all.length+" inscrição(ões)";
  const list=$("entries");list.replaceChildren();
  if(!all.length){const p=document.createElement("p");p.className="empty";p.textContent="Nenhuma inscrição salva neste navegador.";list.append(p);return}
  all.forEach(item=>{
    const box=document.createElement("article");box.className="entry";
    const title=document.createElement("b");title.textContent=item.nick;box.append(title);
    [`Gênero: ${item.gender}`,`Horário: ${item.schedule}`,`Preferência: ${item.politics}`,`Observações: ${item.notes||"Nenhuma"}`,`Data: ${item.date}`].forEach(t=>{const p=document.createElement("p");p.textContent=t;box.append(p)});
    const del=document.createElement("button");del.textContent="Excluir";del.addEventListener("click",()=>{save(load().filter(x=>x.id!==item.id));render()});box.append(del);list.append(box);
  });
}
$("clear").addEventListener("click",()=>{if(confirm("Apagar todas as inscrições deste navegador?")){save([]);render()}});
