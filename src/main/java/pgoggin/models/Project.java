package pgoggin.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Entity
@Data
public class Project implements Serializable{
    @Id
    @GeneratedValue
    Long id;

    @Column
    String name;

    @Column
    String basePackage;

    @JsonProperty("entities")
    @JsonSerialize
    ArrayList<DbEntity> entities;

    public ArrayList<DbEntity> getEntities(){
        return entities;
    }
    public void setEntities(ArrayList<DbEntity> list){
        entities = list;
    }
}
