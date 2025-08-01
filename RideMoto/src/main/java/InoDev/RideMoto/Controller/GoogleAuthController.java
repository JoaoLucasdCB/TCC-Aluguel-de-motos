package InoDev.RideMoto.Controller;

import InoDev.RideMoto.Models.UsuarioModel;
import InoDev.RideMoto.Repository.UsuarioRepository;
import InoDev.RideMoto.Config.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth/google")
@CrossOrigin(origins = "*")
public class GoogleAuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${google.client.id}")
    private String googleClientId;

    @PostMapping("/login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String idToken = request.get("idToken");
        
        if (idToken == null || idToken.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Token ID não fornecido");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken googleIdToken = verifier.verify(idToken);
            
            if (googleIdToken != null) {
                Payload payload = googleIdToken.getPayload();
                
                String googleId = payload.getSubject();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                
                // Verificar se o usuário já existe
                Optional<UsuarioModel> existingUser = usuarioRepository.findByEmail(email);
                UsuarioModel usuario;
                
                if (existingUser.isPresent()) {
                    usuario = existingUser.get();
                    // Atualizar informações do Google se necessário
                    if (usuario.getGoogleId() == null) {
                        usuario.setGoogleId(googleId);
                        usuario.setAuthProvider("GOOGLE");
                        usuario.setPictureUrl(pictureUrl);
                        usuarioRepository.save(usuario);
                    }
                } else {
                    // Criar novo usuário
                    usuario = new UsuarioModel();
                    usuario.setNome(name);
                    usuario.setEmail(email);
                    usuario.setGoogleId(googleId);
                    usuario.setAuthProvider("GOOGLE");
                    usuario.setPictureUrl(pictureUrl);
                    usuario.setTipoUsuario("CLIENTE");
                    usuario.setStatus("ATIVO");
                    // Gerar senha aleatória para usuários Google (não será usada)
                    usuario.setSenha("GOOGLE_AUTH_" + System.currentTimeMillis());
                    usuario.setCpf("00000000000"); // CPF temporário
                    
                    usuario = usuarioRepository.save(usuario);
                }
                
                // Gerar JWT token
                String token = jwtUtil.generateToken(
                    usuario.getEmail(),
                    usuario.getTipoUsuario(),
                    usuario.getNome()
                );
                
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("nome", usuario.getNome());
                response.put("email", usuario.getEmail());
                response.put("tipoUsuario", usuario.getTipoUsuario());
                response.put("id", usuario.getId());
                response.put("pictureUrl", usuario.getPictureUrl());
                response.put("authProvider", usuario.getAuthProvider());
                
                return ResponseEntity.ok(response);
                
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Token ID inválido");
                return ResponseEntity.status(401).body(response);
            }
            
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Erro na verificação do token: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
} 