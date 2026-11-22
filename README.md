# Expedição Leviathan

## Publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie `index.html`, `style.css` e `script.js` para a raiz.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`, salve.
6. Aguarde o GitHub gerar o endereço do site.

## Atenção: como esta versão funciona
Esta versão é um protótipo estático. As inscrições são guardadas no `localStorage` do navegador de cada visitante. Isso significa que:
- cada pessoa vê apenas a confirmação no próprio aparelho;
- o painel administrativo mostra somente inscrições feitas naquele mesmo navegador;
- as inscrições não são enviadas para uma lista pública compartilhada.

Para todos enviarem respostas e você ver tudo no seu painel, precisamos conectar um backend/banco de dados (por exemplo, Supabase ou Firebase). O GitHub Pages sozinho não armazena formulários no servidor.

## Sobre a senha
A senha solicitada está no arquivo `script.js` como demonstração. Como o código do GitHub Pages é público, qualquer visitante pode abrir esse arquivo e descobrir a senha. Não use esta proteção para dados privados. Para um painel realmente protegido, a validação da senha deve acontecer no servidor.

## Privacidade
O formulário pergunta gênero e preferência política. Como essas respostas podem ser pessoais, deixe claro aos participantes que os dados serão visíveis e colete somente o que for necessário. As perguntas podem ser deixadas opcionais se você preferir.
