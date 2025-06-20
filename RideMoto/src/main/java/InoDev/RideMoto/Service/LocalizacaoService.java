package InoDev.RideMoto.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import InoDev.RideMoto.Models.LocalizacaoModel;
import InoDev.RideMoto.Repository.LocalizacaoRepository;

@Service
public class LocalizacaoService {
    private final LocalizacaoRepository repository;

    public LocalizacaoService(LocalizacaoRepository repository) {
        this.repository = repository;
    }

    public List<LocalizacaoModel> listarTodos() {
        return repository.findAll();
    }

    public Optional<LocalizacaoModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public LocalizacaoModel salvar(LocalizacaoModel localizacao) {
        return repository.save(localizacao);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
