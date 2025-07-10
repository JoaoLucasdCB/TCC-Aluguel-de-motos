package InoDev.RideMoto.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import InoDev.RideMoto.Models.UsuarioModel;
import InoDev.RideMoto.Service.UsuarioService;
import InoDev.RideMoto.DTO.UsuarioDTO;
import InoDev.RideMoto.DTO.UsuarioInputDTO;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<UsuarioDTO> listar() {
        return service.listarTodos().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(usuario -> ResponseEntity.ok(toDTO(usuario)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public UsuarioDTO criar(@RequestBody UsuarioInputDTO usuarioInput) {
        UsuarioModel usuario = fromInputDTO(usuarioInput);
        return toDTO(service.salvar(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> atualizar(@PathVariable Long id, @RequestBody UsuarioInputDTO novoUsuario) {
        return service.buscarPorId(id)
                .map(usuario -> {
                    if (novoUsuario.getNome() != null && !novoUsuario.getNome().isEmpty()) usuario.setNome(novoUsuario.getNome());
                    if (novoUsuario.getEmail() != null && !novoUsuario.getEmail().isEmpty()) usuario.setEmail(novoUsuario.getEmail());
                    if (novoUsuario.getSenha() != null && !novoUsuario.getSenha().isEmpty()) usuario.setSenha(novoUsuario.getSenha());
                    if (novoUsuario.getTelefone() != null && !novoUsuario.getTelefone().isEmpty()) usuario.setTelefone(novoUsuario.getTelefone());
                    if (novoUsuario.getCnhNumero() != null && !novoUsuario.getCnhNumero().isEmpty()) usuario.setCnhNumero(novoUsuario.getCnhNumero());
                    if (novoUsuario.getCnhValidade() != null && !novoUsuario.getCnhValidade().isEmpty()) usuario.setCnhValidade(java.time.LocalDate.parse(novoUsuario.getCnhValidade()));
                    if (novoUsuario.getStatus() != null && !novoUsuario.getStatus().isEmpty()) usuario.setStatus(novoUsuario.getStatus());
                    if (novoUsuario.getCpf() != null && !novoUsuario.getCpf().isEmpty()) usuario.setCpf(novoUsuario.getCpf());
                    if (novoUsuario.getTipoUsuario() != null && !novoUsuario.getTipoUsuario().isEmpty()) usuario.setTipoUsuario(novoUsuario.getTipoUsuario());
                    return ResponseEntity.ok(toDTO(service.salvar(usuario)));
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

    // Conversão Model -> DTO
    private UsuarioDTO toDTO(UsuarioModel usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setCpf(usuario.getCpf());
        dto.setCnhNumero(usuario.getCnhNumero());
        dto.setTelefone(usuario.getTelefone());
        dto.setTipoUsuario(usuario.getTipoUsuario());
        dto.setStatus(usuario.getStatus());
        return dto;
    }

    // Conversão InputDTO -> Model
    private UsuarioModel fromInputDTO(UsuarioInputDTO input) {
        UsuarioModel usuario = new UsuarioModel();
        usuario.setNome(input.getNome());
        usuario.setEmail(input.getEmail());
        usuario.setSenha(input.getSenha());
        usuario.setTelefone(input.getTelefone());
        usuario.setCnhNumero(input.getCnhNumero());
        if (input.getCnhValidade() != null) {
            usuario.setCnhValidade(java.time.LocalDate.parse(input.getCnhValidade()));
        }
        usuario.setStatus(input.getStatus());
        usuario.setCpf(input.getCpf());
        usuario.setTipoUsuario(input.getTipoUsuario());
        return usuario;
    }
}