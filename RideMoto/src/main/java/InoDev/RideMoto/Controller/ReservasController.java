package InoDev.RideMoto.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import InoDev.RideMoto.Models.ReservasModel;
import InoDev.RideMoto.Service.ReservasService;
import InoDev.RideMoto.Service.UsuarioService;
import InoDev.RideMoto.Service.PlanosService;
import InoDev.RideMoto.Service.MotosService;
import InoDev.RideMoto.DTO.ReservaDTO;
import InoDev.RideMoto.DTO.ReservaInputDTO;

@RestController
@RequestMapping("/reservas")
public class ReservasController {
    @Autowired
    private ReservasService service;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private PlanosService planosService;
    @Autowired
    private MotosService motosService;

    @GetMapping
    public List<ReservaDTO> listarTodos() {
        return service.listarTodos().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<ReservaDTO> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id).map(this::toDTO);
    }

    @PreAuthorize("hasRole('CLIENTE')")
    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody ReservaInputDTO reservaInput) {
        var usuarioOpt = usuarioService.buscarPorId(reservaInput.getUsuarioId());
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado para o ID informado.");
        }
        // Impede múltiplas reservas por usuário
        if (service.usuarioJaTemReserva(reservaInput.getUsuarioId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já possui uma reserva ativa.");
        }
        ReservasModel reserva = fromInputDTO(reservaInput);
        reserva.setUsuario(usuarioOpt.get());
        return ResponseEntity.ok(toDTO(service.salvar(reserva)));
    }

    @PutMapping("/{id}")
    public ReservaDTO atualizar(@PathVariable Long id, @RequestBody ReservaInputDTO reservaInput) {
        Optional<ReservasModel> existente = service.buscarPorId(id);
        if (existente.isEmpty()) {
            return null;
        }
        ReservasModel reserva = existente.get();
        // Atualiza dataRetirada
        if (reservaInput.getDataRetirada() != null && !reservaInput.getDataRetirada().isEmpty()) {
            try {
                reserva.setDataRetirada(java.time.LocalDate.parse(reservaInput.getDataRetirada()));
            } catch (Exception e) {
                reserva.setDataRetirada(java.time.LocalDate.now());
            }
        } else {
            reserva.setDataRetirada(java.time.LocalDate.now());
        }
        reserva.setStatus(reservaInput.getStatus() != null ? ReservasModel.StatusReserva.valueOf(reservaInput.getStatus()) : null);
        reserva.setUsuario(usuarioService.buscarPorId(reservaInput.getUsuarioId()).orElse(null));
        reserva.setPlano(planosService.buscarPorId(reservaInput.getPlanoId()).orElse(null));
        reserva.setMoto(motosService.buscarPorId(reservaInput.getMotoId()).orElse(null));
        return toDTO(service.salvar(reserva));
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    // Conversão Model -> DTO
    private ReservaDTO toDTO(ReservasModel reserva) {
        ReservaDTO dto = new ReservaDTO();
        dto.setId(reserva.getId());
        dto.setDataRetirada(reserva.getDataRetirada() != null ? reserva.getDataRetirada().toString() : null);
        dto.setStatus(reserva.getStatus() != null ? reserva.getStatus().name() : null);
        dto.setNomePlano(reserva.getPlano() != null ? reserva.getPlano().getNomePlano() : null);
        dto.setNomeUsuario(reserva.getUsuario() != null ? reserva.getUsuario().getNome() : null);

        // Moto
        if (reserva.getMoto() != null) {
            dto.setMotoId(reserva.getMoto().getId());
            dto.setMotoNome(reserva.getMoto().getNome());
            dto.setMotoPlaca(reserva.getMoto().getPlaca());
            dto.setMotoMarca(reserva.getMoto().getMarca());
            dto.setMotoModelo(reserva.getMoto().getModelo());
            try {
                dto.setMotoCilindrada(Integer.valueOf(reserva.getMoto().getCilindrada()));
            } catch (Exception e) {
                dto.setMotoCilindrada(null);
            }
        }
        // Plano
        if (reserva.getPlano() != null) {
            dto.setPlanoId(reserva.getPlano().getId());
            dto.setPlanoDuracao(reserva.getPlano().getDuracao());
            dto.setPlanoBeneficios(reserva.getPlano().getBeneficios());
        }
        // Usuário
        if (reserva.getUsuario() != null) {
            dto.setUsuarioId(reserva.getUsuario().getId());
            dto.setUsuarioNome(reserva.getUsuario().getNome());
        }
        return dto;
    }

    // Conversão InputDTO -> Model
    private ReservasModel fromInputDTO(ReservaInputDTO input) {
        ReservasModel reserva = new ReservasModel();
        reserva.setStatus(input.getStatus() != null ? ReservasModel.StatusReserva.valueOf(input.getStatus()) : null);
        reserva.setUsuario(usuarioService.buscarPorId(input.getUsuarioId()).orElse(null));
        reserva.setPlano(planosService.buscarPorId(input.getPlanoId()).orElse(null));
        reserva.setMoto(motosService.buscarPorId(input.getMotoId()).orElse(null));
        reserva.setDataReserva(java.time.LocalDate.now());
        // Define dataRetirada a partir do input
        if (input.getDataRetirada() != null && !input.getDataRetirada().isEmpty()) {
            try {
                reserva.setDataRetirada(java.time.LocalDate.parse(input.getDataRetirada()));
            } catch (Exception e) {
                reserva.setDataRetirada(java.time.LocalDate.now());
            }
        } else {
            reserva.setDataRetirada(java.time.LocalDate.now());
        }
        return reserva;
    }
}
