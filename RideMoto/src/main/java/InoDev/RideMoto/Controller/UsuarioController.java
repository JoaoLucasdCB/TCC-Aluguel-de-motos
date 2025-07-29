package InoDev.RideMoto.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import InoDev.RideMoto.Service.CpfValidator;
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

    @PostMapping(value = "/teste-cadastro", consumes = {"application/json", "application/json;charset=UTF-8"})
    public InoDev.RideMoto.Models.UsuarioModel cadastrarUsuarioTeste(@RequestBody InoDev.RideMoto.Models.UsuarioModel usuario) {
        return service.salvar(usuario);
    }
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
    public ResponseEntity<?> criar(@RequestBody UsuarioInputDTO usuarioInput) {
        String cpfLimpo = usuarioInput.getCpf() != null ? usuarioInput.getCpf().replaceAll("\\D", "") : null;
        if (cpfLimpo == null || cpfLimpo.length() != 11 || !CpfValidator.isValidCPF(cpfLimpo)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CPF inválido. Insira um CPF válido.");
        }
        try {
            UsuarioModel usuario = fromInputDTO(usuarioInput);
            usuario.setCpf(cpfLimpo); // Garante que salva limpo
            usuario.setTipoUsuario("CLIENTE");
            usuario.setStatus("ATIVO");
            UsuarioDTO dto = toDTO(service.salvar(usuario));
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            e.printStackTrace();
            String msg = e.getMessage();
            if (msg == null || msg.isEmpty()) msg = "Erro desconhecido ao cadastrar usuário.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao cadastrar: " + msg);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody UsuarioInputDTO novoUsuario) {
        if (novoUsuario.getCpf() != null) {
            String cpfLimpo = novoUsuario.getCpf().replaceAll("\\D", "");
            if (cpfLimpo.length() != 11 || !CpfValidator.isValidCPF(cpfLimpo)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CPF inválido. Insira um CPF válido.");
            }
            novoUsuario.setCpf(cpfLimpo); // Garante que salva limpo
        }
        return service.buscarPorId(id)
                .map(usuario -> {
                    if (novoUsuario.getNome() != null && !novoUsuario.getNome().isEmpty()) usuario.setNome(novoUsuario.getNome());
                    if (novoUsuario.getEmail() != null && !novoUsuario.getEmail().isEmpty()) usuario.setEmail(novoUsuario.getEmail());
                    if (novoUsuario.getSenha() != null && !novoUsuario.getSenha().isEmpty()) usuario.setSenha(novoUsuario.getSenha());
                    if (novoUsuario.getTelefone() != null && !novoUsuario.getTelefone().isEmpty()) usuario.setTelefone(novoUsuario.getTelefone());
                    if (novoUsuario.getCnhNumero() != null && !novoUsuario.getCnhNumero().isEmpty()) usuario.setCnhNumero(novoUsuario.getCnhNumero());
                    if (novoUsuario.getCnhValidade() != null && !novoUsuario.getCnhValidade().isEmpty()) usuario.setCnhValidade(java.time.LocalDate.parse(novoUsuario.getCnhValidade()));
                    if (novoUsuario.getStatus() != null && !novoUsuario.getStatus().isEmpty()) usuario.setStatus(novoUsuario.getStatus());
                    if (novoUsuario.getCpf() != null && !novoUsuario.getCpf().isEmpty()) usuario.setCpf(novoUsuario.getCpf().replaceAll("\\D", ""));
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
        if (input.getCpf() != null) {
            usuario.setCpf(input.getCpf().replaceAll("\\D", ""));
        } else {
            usuario.setCpf(null);
        }
        usuario.setTipoUsuario(input.getTipoUsuario());
        return usuario;
    }
}