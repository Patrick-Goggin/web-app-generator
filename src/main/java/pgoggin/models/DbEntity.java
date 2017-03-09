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
public class DbEntity implements Serializable{
    @Id
    @GeneratedValue
    private
    Long id;

    @Column
    private
    String name;

    @Column
    private
    Long projectId;

    @JsonProperty("propertyList")
    @JsonSerialize
    private ArrayList<Property> propertyList;

    public ArrayList<Property> getPropertyList(){
        return propertyList;
    }
    public void setPropertyList(ArrayList<Property> list){
         propertyList = list;
    }
}
