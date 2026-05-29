const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON/Forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// CONFIGURAÇÃO DA SESSÃO (BOAS PRÁTICAS)
// ==========================================
app.use(session({
    // 1. Alta Entropia: Gerando uma chave secreta forte via CSPRNG
    secret: crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: false,
    
    // 2. Ofuscação: Altera o nome padrão (connect.sid) para dificultar fingerprinting
    name: 'APP_SECURE_SID', 
    
    cookie: {
        // 3. Mitigação de XSS: Impede acesso via document.cookie
        httpOnly: true, 
        
        // 4. Mitigação de CSRF: Restringe envio do cookie em contextos cross-site
        sameSite: 'lax', 
        
        // 5. Proteção de canal: Se estivesse em produção com HTTPS, seria true.
        secure: false,
        
        // 6. Ciclo de vida: Expira em 15 minutos (inatividade)
        maxAge: 15 * 60 * 1000 
    }
}));

// Rota de Login (Simulada)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simulação de credenciais (apenas para a PoC)
    if (username === 'admin' && password === 'wesley123') {
        
        // Proteção contra Session Fixation: Força a regeneração do ID após o login
        req.session.regenerate((err) => {
            if (err) return res.status(500).send('Erro ao renovar sessão.');
            
            // Define os dados na nova sessão
            req.session.user = { username: 'admin', role: 'Diretor' };
            
            res.send(`
                <h3>Autenticado com Sucesso!</h3>
                <p>O SessionID foi gerado e enviado ao seu navegador.</p>
                <script>
                    console.log("Tentando ler o cookie via JavaScript (XSS Simulador):");
                    console.log("Resultado de document.cookie ->", document.cookie);
                </script>
                <a href="/dashboard">Ir para o Dashboard Protegido</a>
            `);
        });
    } else {
        res.status(401).send('Credenciais inválidas.');
    }
});

// Rota Protegida (Validação de Estado)
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Acesso Negado: Sessão não encontrada ou expirada.');
    }
    res.send(`<h1>Bem-vindo ao Painel Seguro, ${req.session.user.username}!</h1><p>Seu privilégio é: ${req.session.user.role}</p>`);
});

// Formulário de Entrada (Home)
app.get('/', (req, res) => {
    res.send(`
        <h2>PoC: Gestão de Sessão Segura</h2>
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Usuário (admin)" required><br><br>
            <input type="password" name="password" placeholder="Senha (wesley123)" required><br><br>
            <button type="submit">Efetuar Login</button>
        </form>
    `);
});

app.listen(PORT, () => {
    console.log(`PoC rodando em http://localhost:${PORT}`);
});