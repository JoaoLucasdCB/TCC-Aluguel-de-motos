package InoDev.RideMoto.Service;

import org.springframework.stereotype.Service;
import InoDev.RideMoto.Models.UsuarioModel;
import InoDev.RideMoto.Repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
      private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<UsuarioModel> listarTodos() {
        return repository.findAll();
    }

    public Optional<UsuarioModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public UsuarioModel salvar(UsuarioModel usuario) {
        return repository.save(usuario);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}

   