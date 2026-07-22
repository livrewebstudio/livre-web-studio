# AstroPhonia — site atualizado

**Está tudo pronto.** Fontes e ícones já vêm incluídos e já funcionam.
Você só precisa fazer duas coisas: copiar o favicon e trocar dois links.

---

## O que falta você fazer

### 1. Copiar o favicon
Copie o seu `images/favicon.png` do repositório atual para a pasta `images/` deste pacote.
(É o único arquivo que não veio junto.)

### 2. Trocar 2 links
No `index.html`, procure por `TROCAR` — aparece duas vezes, no bloco de streaming:

- **Spotify** — hoje aponta para o álbum; precisa apontar para a página da artista
- **Amazon Music** — mesma coisa

YouTube e Bandcamp já estão corretos.

### 3. Subir e conferir
- [ ] As 3 páginas abrem e trocam de idioma
- [ ] O idioma escolhido continua ao navegar entre as páginas
- [ ] Menu hambúrguer no celular abre e fecha
- [ ] A barra fixa embaixo não cobre o conteúdo
- [ ] Os links de streaming abrem certo

---

## O que tem no pacote

| Arquivo | O que é |
|---|---|
| `index.html` | Página principal |
| `privacy.html` | Privacy Policy (3 línguas) |
| `cookies.html` | Cookie Policy (3 línguas) |
| `style.css` | Todo o visual |
| `i18n.js` | Todos os textos, nas 3 línguas |
| `main.js` | Starfield, navegação, reveal, cookies |
| `policy.js` | Troca de idioma nas páginas legais |
| `fonts/` | Cinzel, Cormorant Garamond e Raleway — prontas |
| `vendor/fontawesome/` | Ícones — prontos |
| `images/logo-transparent.png` | Logo |

## Sobre as fontes e os ícones

Vieram das fontes oficiais (repositório do Google Fonts e do Font Awesome),
já convertidas para `.woff2` e reduzidas apenas ao necessário:

- **Fontes:** 8 arquivos, 189 KB no total. Cobrem todos os caracteres das três
  línguas — acentos do português e do italiano, aspas «», travessões, ©.
- **Ícones:** apenas os 9 que o site usa. De 295 KB para 2,5 KB.
  Os originais completos ficam em `vendor/fontawesome/completo/` como reserva —
  leia o `LEIA-ME.txt` de lá antes de adicionar um ícone novo.

**Por que isso importa:** enquanto o site carregava fontes e ícones do Google e da
Cloudflare, o IP de cada visitante era enviado a essas empresas. Na Itália isso é
tratamento de dado pessoal — e a sua privacy afirmava que nenhum dado era coletado,
ou seja, a afirmação não era verdadeira. Agora o site faz **zero requisições
externas** e a policy está correta.

As licenças (SIL OFL para as fontes, CC BY / MIT para o Font Awesome) estão nas
respectivas pastas, como as licenças exigem.

---

## Como adicionar uma música nova

1. No `i18n.js`, copie um bloco `card4_*` e crie `card5_freq_label`, `card5_title`,
   `card5_text` **nas três línguas**.
2. No `index.html`, copie um `<article class="track reveal">`, troque o número
   romano e as chaves.
3. Se ainda não lançou, acrescente dentro do artigo:
   ```html
   <span class="track-soon" data-i18n="track_soon">Coming Soon</span>
   ```
   e a classe `is-soon` no artigo. A chave `track_soon` já existe nas 3 línguas.

## Como mudar cores

Tudo está no `:root` do `style.css` (logo depois das declarações de fonte).
Mudou lá, mudou no site inteiro.

## Âncoras antigas

`#therapy` e `#audios` viraram `#method` e `#journeys`. Quem tiver um link antigo
salvo continua caindo no lugar certo — há um redirecionamento no `main.js`.
