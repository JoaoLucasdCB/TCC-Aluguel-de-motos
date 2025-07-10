package InoDev.RideMoto.Controller;

import InoDev.RideMoto.Models.UsuarioModel;
import InoDev.RideMoto.Repository.UsuarioRepository;
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

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String senha = loginData.get("senha");
        return usuarioRepository.findByEmail(email)
                .filter(usuario -> usuario.getSenha().equals(senha))
                .map(usuario -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("token", "fake-jwt-token");
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
