package InoDev.RideMoto.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import InoDev.RideMoto.Models.AdminModel;
import InoDev.RideMoto.Repository.AdminRepository;

@Service
public class AdminService {
    private final AdminRepository repository;

    public AdminService(AdminRepository repository) {
        this.repository = repository;
    }

    public List<AdminModel> listarTodos() {
        return repository.findAll();
    }

    public Optional<AdminModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public AdminModel salvar(AdminModel admin) {
        return repository.save(admin);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
