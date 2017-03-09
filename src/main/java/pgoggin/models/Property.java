package pgoggin.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Entity
@Data
public class Property implements Serializable{
    @Id
    @GeneratedValue
    Long id;

    @Column
    Long entityId;

    @Column
    String name;

    @Column
    String type;

    @Column
    Long projectId;
}
