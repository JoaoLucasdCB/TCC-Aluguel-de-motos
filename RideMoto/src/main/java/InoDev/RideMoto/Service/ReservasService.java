package InoDev.RideMoto.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import InoDev.RideMoto.Models.ReservasModel;
import InoDev.RideMoto.Repository.ReservasRepository;

@Service
public class ReservasService {
    private final ReservasRepository repository;

    public ReservasService(ReservasRepository repository) {
        this.repository = repository;
    }

    public List<ReservasModel> listarTodos() {
        return repository.findAll();
    }

    public Optional<ReservasModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public ReservasModel salvar(ReservasModel reserva) {
        return repository.save(reserva);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
    public boolean usuarioJaTemReserva(Long usuarioId) {
        return repository.existsByUsuarioId(usuarioId);
    }
}
