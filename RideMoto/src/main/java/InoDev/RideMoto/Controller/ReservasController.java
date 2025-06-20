package InoDev.RideMoto.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping
    public ReservaDTO salvar(@RequestBody ReservaInputDTO reservaInput) {
        ReservasModel reserva = fromInputDTO(reservaInput);
        return toDTO(service.salvar(reserva));
    }

    @PutMapping("/{id}")
    public ReservaDTO atualizar(@PathVariable Long id, @RequestBody ReservaInputDTO reservaInput) {
        Optional<ReservasModel> existente = service.buscarPorId(id);
        if (existente.isEmpty()) {
            return null;
        }
        ReservasModel reserva = existente.get();
        reserva.setDataInicio(reservaInput.getDataInicio());
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
        dto.setDataInicio(reserva.getDataInicio());
        dto.setStatus(reserva.getStatus() != null ? reserva.getStatus().name() : null);
        dto.setNomePlano(reserva.getPlano() != null ? reserva.getPlano().getNomePlano() : null);
        dto.setNomeUsuario(reserva.getUsuario() != null ? reserva.getUsuario().getNome() : null);
        return dto;
    }

    // Conversão InputDTO -> Model
    private ReservasModel fromInputDTO(ReservaInputDTO input) {
        ReservasModel reserva = new ReservasModel();
        reserva.setDataInicio(input.getDataInicio());
        reserva.setStatus(input.getStatus() != null ? ReservasModel.StatusReserva.valueOf(input.getStatus()) : null);
        reserva.setUsuario(usuarioService.buscarPorId(input.getUsuarioId()).orElse(null));
        reserva.setPlano(planosService.buscarPorId(input.getPlanoId()).orElse(null));
        reserva.setMoto(motosService.buscarPorId(input.getMotoId()).orElse(null));
        return reserva;
    }
}
