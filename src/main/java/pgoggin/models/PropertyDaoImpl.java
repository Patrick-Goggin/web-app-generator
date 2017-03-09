package pgoggin.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Component
@Transactional
public class PropertyDaoImpl {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    PropertyRepository repo;

    public Property create(Property property){
        repo.save(property);
        return property;
    }

    public void createMultiple(Iterable<Property> properties){
        repo.save(properties);
    }

    public List<Property> getAll(){
        List<Property> list = repo.findAll();
        return list;
    }

    public Property get(long id){
        Property property = repo.getOne(id);
        return property;
    }

    public ArrayList<Property>  getByProjectId(long projectId){
        ArrayList<Property> properties = new ArrayList<>(entityManager.createQuery("from Property where projectId = :projectId").setParameter("projectId", projectId).getResultList());

        return properties;
    }

    public ArrayList<Property> getByEntityId(long entityId){
        ArrayList<Property> properties = new ArrayList<>(entityManager.createQuery("from Property where entityId = :entityId").setParameter("entityId", entityId).getResultList());
        return properties;
    }

    public List<Property> getByName(String name){
        List<Property> properties = entityManager.createQuery("from Property where name = :name").setParameter("name", name).getResultList();
        return properties;
    }

    public void update(Property property){
        entityManager.merge(property);
    }

    public Property delete(long id){
        Property property = repo.getOne(id);
        repo.delete(id);
        return property;
    }

    public void deleteMultiple(Iterable<Property> properties){
        repo.deleteInBatch(properties);
    }

    public void deleteAll(){
        repo.deleteAllInBatch();
    }
}
