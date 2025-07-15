package InoDev.RideMoto.Controller;

import InoDev.RideMoto.Models.UsuarioModel;
import InoDev.RideMoto.Repository.UsuarioRepository;
import InoDev.RideMoto.Config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")

public class AuthController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String senha = loginData.get("senha");
        System.out.println("[DEBUG] E-mail recebido: '" + email + "'");
        System.out.println("[DEBUG] Senha recebida: '" + senha + "'");
        var usuarioOpt = usuarioRepository.findByEmail(email);
        System.out.println("[DEBUG] Resultado findByEmail: " + (usuarioOpt.isPresent() ? "Usuário encontrado: " + usuarioOpt.get().getEmail() : "Nenhum usuário encontrado"));
        return usuarioOpt
                .filter(usuario -> {
                    boolean senhaOk = usuario.getSenha().equals(senha);
                    System.out.println("[DEBUG] Senha no banco: '" + usuario.getSenha() + "' | Comparação: " + senhaOk);
                    return senhaOk;
                })
                .map(usuario -> {
                    Map<String, String> response = new HashMap<>();
                    String token = jwtUtil.generateToken(
                        usuario.getEmail(),
                        usuario.getTipoUsuario(),
                        usuario.getNome()
                    );
                    response.put("token", token);
                    response.put("nome", usuario.getNome());
                    response.put("email", usuario.getEmail());
                    response.put("tipoUsuario", usuario.getTipoUsuario());
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("error", "Credenciais inválidas");
                    return ResponseEntity.status(401).body(response);
                });
    }
}
