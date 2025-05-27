package InoDev.RideMoto.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import InoDev.RideMoto.Models.UsuarioModel;
import InoDev.RideMoto.Service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/usuarios")

public class UsuarioController {
     private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<UsuarioModel> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioModel> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public UsuarioModel criar(@RequestBody UsuarioModel usuario) {
        return service.salvar(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioModel> atualizar(@PathVariable Long id, @RequestBody UsuarioModel novoUsuario) {
        return service.buscarPorId(id)
                .map(usuario -> {
                    usuario.setNome(novoUsuario.getNome());
                    usuario.setEmail(novoUsuario.getEmail());
                    usuario.setSenhaHash(novoUsuario.getSenhaHash());
                    usuario.setTelefone(novoUsuario.getTelefone());
                    usuario.setCnhNumero(novoUsuario.getCnhNumero());
                    usuario.setCnhValidade(novoUsuario.getCnhValidade());
                    usuario.setStatus(novoUsuario.getStatus());
                    return ResponseEntity.ok(service.salvar(usuario));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (service.buscarPorId(id).isPresent()) {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}