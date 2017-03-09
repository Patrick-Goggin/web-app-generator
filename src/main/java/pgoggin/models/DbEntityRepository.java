package pgoggin.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Repository
public interface DbEntityRepository extends JpaRepository<DbEntity, Long> {
}
