# Configuração do Login com Google OAuth2

## Passos para Configurar

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API "Google+ API" ou "Google Identity API"

### 2. Configurar Credenciais OAuth2

1. No menu lateral, vá em "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure o tipo de aplicação:
   - **Application type**: Web application
   - **Name**: RideMoto Web App
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (para desenvolvimento)
     - `http://localhost:8080` (se necessário)
     - `https://seudominio.com` (para produção)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/login.html`
     - `https://seudominio.com/login.html`

### 3. Configurar o Backend

1. Copie o **Client ID** gerado no Google Cloud Console
2. Edite o arquivo `RideMoto/src/main/resources/application.properties`:
   ```properties
   google.client.id=SEU_CLIENT_ID_AQUI
   google.client.secret=SEU_CLIENT_SECRET_AQUI
   ```

### 4. Configurar o Frontend

1. Edite o arquivo `frontend/Publico/javascript/login.js`
2. Substitua `YOUR_GOOGLE_CLIENT_ID` pelo seu Client ID real:
   ```javascript
   const GOOGLE_CLIENT_ID = 'SEU_CLIENT_ID_AQUI';
   ```

### 5. Atualizar o Banco de Dados

Execute o script SQL `RideMoto/src/main/resources/google_oauth_migration.sql` no seu banco de dados MySQL:

```sql
ALTER TABLE usuarios 
ADD COLUMN google_id VARCHAR(255) UNIQUE,
ADD COLUMN auth_provider VARCHAR(50),
ADD COLUMN picture_url TEXT;

CREATE INDEX idx_google_id ON usuarios(google_id);
CREATE INDEX idx_auth_provider ON usuarios(auth_provider);
```

### 6. Testar a Implementação

1. Inicie o backend Spring Boot
2. Abra o arquivo `frontend/Publico/html/login.html` no navegador
3. Clique no botão "Entrar com Google"
4. Faça login com uma conta Google
5. Verifique se o usuário foi criado no banco de dados

## Estrutura de Dados

### Novos Campos no Modelo UsuarioModel:

- `googleId`: ID único do usuário no Google
- `authProvider`: Provedor de autenticação ("GOOGLE", "LOCAL")
- `pictureUrl`: URL da foto de perfil do Google

### Fluxo de Autenticação:

1. Usuário clica no botão "Entrar com Google"
2. Google retorna um ID Token
3. Frontend envia o token para `/auth/google/login`
4. Backend verifica o token com Google
5. Se válido, cria/atualiza usuário no banco
6. Retorna JWT token para o frontend
7. Usuário é redirecionado para a página principal

## Segurança

- O ID Token do Google é verificado no backend
- Senhas aleatórias são geradas para usuários Google
- CPF temporário é definido como "00000000000"
- Usuários Google são automaticamente marcados como "CLIENTE"

## Troubleshooting

### Erro: "Token ID inválido"
- Verifique se o Client ID está correto
- Confirme se as origens autorizadas incluem seu domínio

### Erro: "Credenciais inválidas"
- Verifique se a API Google Identity está ativada
- Confirme se as credenciais OAuth2 estão configuradas corretamente

### Erro de CORS
- Verifique se o `@CrossOrigin(origins = "*")` está presente no controller
- Confirme se as origens estão autorizadas no Google Cloud Console 