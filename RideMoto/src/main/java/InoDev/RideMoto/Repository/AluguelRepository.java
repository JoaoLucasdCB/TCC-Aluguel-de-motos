package InoDev.RideMoto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import InoDev.RideMoto.Models.AluguelModel;

public interface AluguelRepository extends JpaRepository<AluguelModel, Long> {
}