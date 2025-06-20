package InoDev.RideMoto.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import InoDev.RideMoto.Models.LocalizacaoModel;
import InoDev.RideMoto.Service.LocalizacaoService;

@RestController
@RequestMapping("/localizacoes")
public class LocalizacaoController {
    @Autowired
    private LocalizacaoService service;

    @GetMapping
    public List<LocalizacaoModel> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<LocalizacaoModel> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public LocalizacaoModel salvar(@RequestBody LocalizacaoModel localizacao) {
        return service.salvar(localizacao);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @PutMapping("/{id}")
    public LocalizacaoModel atualizar(@PathVariable Long id, @RequestBody LocalizacaoModel localizacaoAtualizada) {
        Optional<LocalizacaoModel> existente = service.buscarPorId(id);
        if (existente.isEmpty()) {
            return null;
        }
        LocalizacaoModel localizacao = existente.get();
        localizacao.setCidade(localizacaoAtualizada.getCidade());
        localizacao.setEstado(localizacaoAtualizada.getEstado());
        localizacao.setEnderecoCompleto(localizacaoAtualizada.getEnderecoCompleto());
        localizacao.setHorarioFuncionamento(localizacaoAtualizada.getHorarioFuncionamento());
        return service.salvar(localizacao);
    }
}
