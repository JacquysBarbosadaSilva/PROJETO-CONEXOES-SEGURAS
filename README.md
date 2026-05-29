# Projeto: Conexões Seguras

**Ana Lívia Santos Lopes · Jacquys Barbosa da Silva · Jhônatas Lopes da Silva · Luis Cesar Consoli de Almeida**

Trabalho prático da disciplina de Redes de Computadores. O objetivo foi explorar, de forma hands-on, três aspectos fundamentais de segurança em redes e aplicações web: captura de tráfego, criptografia em trânsito com TLS e gerenciamento seguro de sessões.

---

## Módulo 1 — Sniffing de rede

A proposta deste módulo foi mostrar, na prática, o que acontece quando protocolos sem criptografia são usados numa rede local. Utilizamos o Wireshark com a interface em modo promíscuo para capturar pacotes e observar dados trafegando em texto claro.

Duas capturas estão disponíveis em `modulo1-sniffing/evidencias/`:

- `Promiscuous_ativado.pcapng` — captura com a placa em modo promíscuo, onde é possível ver pacotes destinados a outros hosts
- `Promiscuous_desativado.pcapng` — captura sem o modo promíscuo, para comparação

A implementação prática com detalhamento do processo está em `modulo1-sniffing/demonstracao-pratica/`.

---

## Módulo 2 — TLS/SSL

Aqui o foco foi entender como o TLS protege o canal de comunicação. Fizemos a captura de um handshake TLS completo e analisamos cada etapa no Wireshark: do ClientHello até o Finished, passando pela troca de certificados e negociação das cipher suites.

O arquivo `modulo2-tls/evidencias/modulo2_TLS.pcapng` contém a captura do tráfego e pode ser aberto direto no Wireshark. Em `modulo2-tls/demonstracao-pratica/` está o PDF com a prova de conceito, que explica o que foi observado em cada fase do handshake e o que cada campo significa.

---

## Módulo 3 — Segurança de sessão

O módulo 3 tem uma PoC funcional em Node.js que demonstra boas práticas de gerenciamento de sessão. O servidor usa `express` + `express-session` e implementa:

- geração de secret via `crypto.randomBytes` (alta entropia, CSPRNG)
- nome de cookie customizado para dificultar fingerprinting
- flags `httpOnly` e `sameSite` no cookie
- expiração de sessão após 15 minutos de inatividade
- regeneração de session ID após o login (proteção contra session fixation)

### Como rodar

```bash
cd modulo3-sessao/evidencias/poc-seguranca-sessao
npm install
npm start
```

O servidor sobe em `http://localhost:3000`. As credenciais de teste são `admin` / `wesley123`. Após o login, o console do navegador vai mostrar que `document.cookie` retorna vazio por causa do `httpOnly` — esse é o ponto central da demonstração.

A prova de conceito em PDF está em `modulo3-sessao/demonstracao-pratica/`.

---

## Estrutura do repositório

```
.
├── modulo1-sniffing/
│   ├── demonstracao-pratica/
│   └── evidencias/
│       ├── Promiscuous_ativado.pcapng
│       └── Promiscuous_desativado.pcapng
├── modulo2-tls/
│   ├── demonstracao-pratica/
│   └── evidencias/
│       └── modulo2_TLS.pcapng
├── modulo3-sessao/
│   ├── demonstracao-pratica/
│   └── evidencias/
│       └── poc-seguranca-sessao/
│           ├── server.js
│           └── package.json
├── index.html
├── style.css
└── main.js
```

---

## Relatório técnico

O relatório completo do projeto está na raiz do repositório: `Relatório Técnico - Projeto: Conexões Seguras.pdf`.