package InoDev.RideMoto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import InoDev.RideMoto.Models.AdminModel;

public interface AdminRepository extends JpaRepository<AdminModel, Long> {
}
