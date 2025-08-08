package InoDev.RideMoto.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import InoDev.RideMoto.Models.PlanosModel;
import InoDev.RideMoto.Service.PlanosService;
import InoDev.RideMoto.DTO.PlanoDTO;
import InoDev.RideMoto.DTO.PlanoInputDTO;

@RestController
@RequestMapping("/planos")
public class PlanosController {
    @Autowired
    private PlanosService service;

    @GetMapping
    public List<PlanoDTO> listarTodos() {
        return service.listarTodos().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Optional<PlanoDTO> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id).map(this::toDTO);
    }

    @PostMapping
    public PlanoDTO salvar(@RequestBody PlanoInputDTO planoInput) {
        PlanosModel plano = fromInputDTO(planoInput);
        return toDTO(service.salvar(plano));
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @PutMapping("/{id}")
    public PlanoDTO atualizar(@PathVariable Long id, @RequestBody PlanoInputDTO planoInput) {
        Optional<PlanosModel> existente = service.buscarPorId(id);
        if (existente.isEmpty()) {
            return null;
        }
        PlanosModel plano = existente.get();
        plano.setNomePlano(planoInput.getNomePlano());
        plano.setDuracao(planoInput.getDuracao());
        plano.setBeneficios(planoInput.getBeneficios());
        return toDTO(service.salvar(plano));
    }

    @GetMapping("/nome/{nome}")
    public PlanoDTO buscarPorNome(@PathVariable String nome) {
        Optional<PlanosModel> planoOpt = service.listarTodos().stream()
            .filter(p -> p.getNomePlano() != null && p.getNomePlano().equalsIgnoreCase(nome))
            .findFirst();
        return planoOpt.map(this::toDTO).orElse(null);
    }

    // Conversão Model -> DTO
    private PlanoDTO toDTO(PlanosModel plano) {
        PlanoDTO dto = new PlanoDTO();
        dto.setId(plano.getId());
        dto.setNomePlano(plano.getNomePlano());
        dto.setDuracao(plano.getDuracao());
        dto.setBeneficios(plano.getBeneficios());
        return dto;
    }

    // Conversão InputDTO -> Model
    private PlanosModel fromInputDTO(PlanoInputDTO input) {
        PlanosModel plano = new PlanosModel();
        plano.setNomePlano(input.getNomePlano());
        plano.setDuracao(input.getDuracao());
        plano.setBeneficios(input.getBeneficios());
        return plano;
    }
}
