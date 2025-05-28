package InoDev.RideMoto.Controller;

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
    public ResponseEntity<MotosModel> cadastrarMoto(@RequestBody MotosModel moto) {
        MotosModel novaMoto = motosService.salvar(moto);
        return ResponseEntity.ok(novaMoto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MotosModel> atualizarMoto(@PathVariable Long id, @RequestBody MotosModel motoAtualizada) {
        Optional<MotosModel> existente = motosService.buscarPorId(id);

        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        MotosModel moto = existente.get();
        moto.setPlaca(motoAtualizada.getPlaca());
        moto.setModelo(motoAtualizada.getModelo());
        moto.setAno(motoAtualizada.getAno());
        moto.setQuilometragem(motoAtualizada.getQuilometragem());
        moto.setStatus(motoAtualizada.getStatus());
        moto.setCriadoEm(motoAtualizada.getCriadoEm());

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
}
