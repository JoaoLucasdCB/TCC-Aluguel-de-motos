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

    @Autowired
    private MotosService motosService;

    @GetMapping
    public ResponseEntity<List<MotosModel>> listarTodas() {
        List<MotosModel> motos = motosService.listarTodas();
        return ResponseEntity.ok(motos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MotosModel> buscarPorId(@PathVariable Long id) {
        Optional<MotosModel> moto = motosService.buscarPorId(id);
        return moto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/placa/{placa}")
    public ResponseEntity<MotosModel> buscarPorPlaca(@PathVariable String placa) {
        Optional<MotosModel> moto = motosService.buscarPorPlaca(placa);
        return moto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MotosModel> cadastrarMoto(@RequestBody MotosInputDTO dto) {
        MotosModel moto = new MotosModel();
        moto.setNome(dto.getNome());
        moto.setMarca(dto.getMarca());
        moto.setModelo(dto.getModelo());
        moto.setCilindrada(dto.getCilindrada());
        moto.setPlaca(dto.getPlaca());
        moto.setStatus(dto.getStatus());
        moto.setAno(dto.getAno());
        moto.setQuilometragem(dto.getQuilometragem());
        moto.setImagem(dto.getImagem());
        MotosModel novaMoto = motosService.salvar(moto);
        return ResponseEntity.ok(novaMoto);
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
