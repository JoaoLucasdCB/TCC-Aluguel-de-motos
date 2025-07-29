package InoDev.RideMoto.Repository;

import InoDev.RideMoto.Models.MotosModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MotosRepository extends JpaRepository<MotosModel, Long> {
    java.util.List<MotosModel> findByStatus(InoDev.RideMoto.Models.MotosModel.StatusMoto status);

    Optional<MotosModel> findByPlaca(String placa);
    
}
