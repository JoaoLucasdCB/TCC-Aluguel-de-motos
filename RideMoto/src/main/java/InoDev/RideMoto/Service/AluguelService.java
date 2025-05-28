package InoDev.RideMoto.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import InoDev.RideMoto.Models.AluguelModel;
import InoDev.RideMoto.Repository.AluguelRepository;

@Service
public class AluguelService {
        private final AluguelRepository repository;

    public AluguelService(AluguelRepository repository) {
        this.repository = repository;
    }

    public List<AluguelModel> listarTodos() {
        return repository.findAll();
    }

    public Optional<AluguelModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public AluguelModel salvar(AluguelModel aluguel) {
        return repository.save(aluguel);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}