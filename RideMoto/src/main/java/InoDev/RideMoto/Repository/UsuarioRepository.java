package InoDev.RideMoto.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import InoDev.RideMoto.Models.UsuarioModel;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {
    Optional<UsuarioModel> findByEmail(String email);
}