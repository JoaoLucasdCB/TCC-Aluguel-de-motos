package InoDev.RideMoto.Controller;

import InoDev.RideMoto.DTO.MotosInputDTO;
import InoDev.RideMoto.Models.MotosModel;
import InoDev.RideMoto.Service.MotosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/motos")
public class MotosController {
    @GetMapping("/disponiveis")
    public ResponseEntity<java.util.List<InoDev.RideMoto.DTO.MotosDTO>> listarDisponiveis() {
        List<MotosModel> motos = motosService.listarDisponiveis();
        List<InoDev.RideMoto.DTO.MotosDTO> motosDTO = motos.stream().map(InoDev.RideMoto.DTO.MotosDTO::new).toList();
        return ResponseEntity.ok(motosDTO);
    }

    @Autowired
    private MotosService motosService;

    @GetMapping
    public ResponseEntity<List<InoDev.RideMoto.DTO.MotosDTO>> listarTodas() {
        List<MotosModel> motos = motosService.listarTodas();
        List<InoDev.RideMoto.DTO.MotosDTO> motosDTO = motos.stream().map(InoDev.RideMoto.DTO.MotosDTO::new).toList();
        return ResponseEntity.ok(motosDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InoDev.RideMoto.DTO.MotosDTO> buscarPorId(@PathVariable Long id) {
        Optional<MotosModel> moto = motosService.buscarPorId(id);
        return moto.map(m -> ResponseEntity.ok(new InoDev.RideMoto.DTO.MotosDTO(m))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/placa/{placa}")
    public ResponseEntity<MotosModel> buscarPorPlaca(@PathVariable String placa) {
        Optional<MotosModel> moto = motosService.buscarPorPlaca(placa);
        return moto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> cadastrarMoto(@RequestBody MotosInputDTO dto) {
        try {
            MotosModel moto = new MotosModel();
            moto.setNome(dto.getNome());
            moto.setMarca(dto.getMarca());
            moto.setModelo(dto.getModelo());
            moto.setCilindrada(dto.getCilindrada());
            moto.setPlaca(dto.getPlaca());
            // Validação e conversão do status
            InoDev.RideMoto.Models.MotosModel.StatusMoto statusEnum;
            try {
                statusEnum = InoDev.RideMoto.Models.MotosModel.StatusMoto.valueOf(dto.getStatus().toString());
            } catch (Exception ex) {
                return ResponseEntity.badRequest().body("Status da moto inválido. Valores aceitos: DISPONIVEL, RESERVADA, ALUGADA, MANUTENCAO");
            }
            moto.setStatus(statusEnum);
            moto.setAno(dto.getAno());
            moto.setQuilometragem(dto.getQuilometragem());
            moto.setImagem(dto.getImagem());
            MotosModel novaMoto = motosService.salvar(moto);
            return ResponseEntity.ok(novaMoto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao cadastrar moto: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = {"application/json", "application/json;charset=UTF-8"})
    public ResponseEntity<MotosModel> atualizarMoto(@PathVariable Long id, @RequestBody MotosInputDTO dto) {
        Optional<MotosModel> existente = motosService.buscarPorId(id);

        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        MotosModel moto = existente.get();
        moto.setNome(dto.getNome());
        moto.setMarca(dto.getMarca());
        moto.setModelo(dto.getModelo());
        moto.setCilindrada(dto.getCilindrada());
        moto.setPlaca(dto.getPlaca());
        moto.setStatus(dto.getStatus());
        moto.setAno(dto.getAno());
        moto.setQuilometragem(dto.getQuilometragem());
        moto.setImagem(dto.getImagem());

        MotosModel atualizada = motosService.salvar(moto);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMoto(@PathVariable Long id) {
        Optional<MotosModel> existente = motosService.buscarPorId(id);

        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        motosService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/teste")
    public ResponseEntity<String> teste(@RequestBody java.util.Map<String, Object> body) {
        return ResponseEntity.ok("OK");
    }
}
