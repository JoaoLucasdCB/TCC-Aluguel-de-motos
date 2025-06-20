package InoDev.RideMoto.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import InoDev.RideMoto.Models.PlanosModel;
import InoDev.RideMoto.Repository.PlanosRepository;

@Service
public class PlanosService {
    private final PlanosRepository repository;

    public PlanosService(PlanosRepository repository) {
        this.repository = repository;
    }

    public List<PlanosModel> listarTodos() {
        return repository.findAll();
    }

    public Optional<PlanosModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public PlanosModel salvar(PlanosModel plano) {
        return repository.save(plano);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
