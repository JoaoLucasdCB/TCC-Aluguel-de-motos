package InoDev.RideMoto.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import InoDev.RideMoto.Models.AdminModel;
import InoDev.RideMoto.Service.AdminService;

@RestController
@RequestMapping("/admins")
public class AdminController {
    @Autowired
    private AdminService service;

    @GetMapping
    public List<AdminModel> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<AdminModel> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public AdminModel salvar(@RequestBody AdminModel admin) {
        return service.salvar(admin);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
