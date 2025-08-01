// Exemplo alternativo de implementação do login com Google
// Este arquivo pode ser usado como referência se a implementação principal não funcionar

// Configuração do Google OAuth2
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

// Função para inicializar o Google Sign-In
function initGoogleSignIn() {
    // Carregar a API do Google
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: GOOGLE_CLIENT_ID
        }).then(function(auth2) {
            console.log('Google Sign-In inicializado com sucesso');
            
            // Adicionar listener ao botão
            document.getElementById('googleLoginBtn').addEventListener('click', function() {
                signInWithGoogle();
            });
        }).catch(function(error) {
            console.error('Erro ao inicializar Google Sign-In:', error);
        });
    });
}

// Função para fazer login com Google
function signInWithGoogle() {
    const auth2 = gapi.auth2.getAuthInstance();
    
    auth2.signIn().then(function(googleUser) {
        const profile = googleUser.getBasicProfile();
        const idToken = googleUser.getAuthResponse().id_token;
        
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Email: ' + profile.getEmail());
        console.log('Image URL: ' + profile.getImageUrl());
        
        // Enviar token para o backend
        authenticateWithBackend(idToken);
        
    }).catch(function(error) {
        console.error('Erro no login com Google:', error);
        alert('Erro no login com Google. Tente novamente.');
    });
}

// Função para autenticar com o backend
function authenticateWithBackend(idToken) {
    fetch('http://localhost:8080/auth/google/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken: idToken })
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro na autenticação');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login bem-sucedido:', data);
        
        // Salvar dados no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('tipoUsuario', data.tipoUsuario);
        localStorage.setItem('nomeUsuario', data.nome);
        localStorage.setItem('usuarioId', data.id);
        
        if (data.pictureUrl) {
            localStorage.setItem('userPicture', data.pictureUrl);
        }
        
        // Redirecionar baseado no tipo de usuário
        if (data.tipoUsuario && data.tipoUsuario.toLowerCase() === 'admin') {
            window.location.href = '../../Admin/html/cadastrar-moto.html';
        } else {
            window.location.href = 'aluguel.html';
        }
    })
    .catch(error => {
        console.error('Erro na autenticação:', error);
        alert('Erro na autenticação: ' + error.message);
    });
}

// Função para fazer logout
function signOutFromGoogle() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('Usuário deslogado do Google');
        // Limpar localStorage
        localStorage.clear();
        // Redirecionar para página de login
        window.location.href = 'login.html';
    });
}

// Inicializar quando a página carregar
window.onload = function() {
    // Aguardar um pouco para garantir que a API do Google carregou
    setTimeout(function() {
        if (typeof gapi !== 'undefined') {
            initGoogleSignIn();
        } else {
            console.error('API do Google não carregou');
        }
    }, 1000);
}; 