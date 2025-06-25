package InoDev.RideMoto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import InoDev.RideMoto.Models.LocalizacaoModel;

public interface LocalizacaoRepository extends JpaRepository<LocalizacaoModel, Long> {
}
