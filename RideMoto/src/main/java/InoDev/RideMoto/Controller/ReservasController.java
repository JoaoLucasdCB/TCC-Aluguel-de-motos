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
import InoDev.RideMoto.Service.LocalizacaoService;

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
    @Autowired
    private LocalizacaoService localizacaoService;

    @GetMapping
    public List<ReservaDTO> listarTodos() {
        return service.listarTodos().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<ReservaDTO> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id).map(this::toDTO);
    }

    // @PreAuthorize removido para liberar acesso
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
        // Setar local de retirada
        if (reservaInput.getLocalRetiradaId() != null) {
            localizacaoService.buscarPorId(reservaInput.getLocalRetiradaId()).ifPresent(reserva::setLocalRetirada);
        }
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
        if (reservaInput.getLocalRetiradaId() != null) {
            localizacaoService.buscarPorId(reservaInput.getLocalRetiradaId()).ifPresent(reserva::setLocalRetirada);
        }
        return toDTO(service.salvar(reserva));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        // Busca a reserva antes de deletar
        Optional<InoDev.RideMoto.Models.ReservasModel> reservaOpt = service.buscarPorId(id);
        if (reservaOpt.isPresent()) {
            InoDev.RideMoto.Models.ReservasModel reserva = reservaOpt.get();
            // Atualiza status da moto para DISPONIVEL
            if (reserva.getMoto() != null) {
                var moto = reserva.getMoto();
                moto.setStatus(InoDev.RideMoto.Models.MotosModel.StatusMoto.DISPONIVEL);
                motosService.salvar(moto);
            }
        }
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
        // Local de retirada
        if (reserva.getLocalRetirada() != null) {
            dto.setLocalRetiradaId(reserva.getLocalRetirada().getId());
            dto.setLocalRetiradaCidade(reserva.getLocalRetirada().getCidade());
            dto.setLocalRetiradaEstado(reserva.getLocalRetirada().getEstado());
            dto.setLocalRetiradaEndereco(reserva.getLocalRetirada().getEnderecoCompleto());
            dto.setLocalRetiradaHorario(reserva.getLocalRetirada().getHorarioFuncionamento());
        }
        return dto;
    }

    // Conversão InputDTO -> Model
    private ReservasModel fromInputDTO(ReservaInputDTO input) {
        ReservasModel reserva = new ReservasModel();
        // Define dataInicio a partir do input
        if (input.getDataInicio() != null && !input.getDataInicio().isEmpty()) {
            try {
                reserva.setDataInicio(java.time.LocalDate.parse(input.getDataInicio()));
            } catch (Exception e) {
                reserva.setDataInicio(java.time.LocalDate.now());
            }
        } else {
            reserva.setDataInicio(java.time.LocalDate.now());
        }
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
        // Setar local de retirada
        if (input.getLocalRetiradaId() != null) {
            localizacaoService.buscarPorId(input.getLocalRetiradaId()).ifPresent(reserva::setLocalRetirada);
        }
        return reserva;
    }
}
