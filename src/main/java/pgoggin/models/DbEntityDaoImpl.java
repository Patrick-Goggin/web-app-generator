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

import static com.sun.tools.doclets.formats.html.markup.HtmlStyle.summary;
import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Component
@Transactional
public class DbEntityDaoImpl {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    DbEntityRepository repo;

    @Autowired
    PropertyDaoImpl pDao;

    public DbEntity create(DbEntity entity){
        repo.save(entity);
        return entity;
    }

    public void createMultiple(Iterable<DbEntity> entities){
        repo.save(entities);
    }

    public List<DbEntity> getAll(){
        List<DbEntity> list = repo.findAll();
        return list;
    }

    public DbEntity get(long id){
        DbEntity entity = repo.getOne(id);
        return entity;
    }

    public DbEntity complete(DbEntity entity){
        ArrayList<Property> properties = new ArrayList(pDao.getByEntityId(entity.getId()));
        entity.setPropertyList(properties);
        return entity;
    }


    public List<DbEntity> getByName(String name){
        List<DbEntity> entities = entityManager.createQuery("from DbEntity where name = :name").setParameter("name", name).getResultList();
        return entities;
    }

    public List<DbEntity> getByProjectId(Long projectId){
        List<DbEntity> entities = entityManager.createQuery("from DbEntity where projectId = :projectId").setParameter("projectId", projectId).getResultList();
        return entities;
    }



    public void update(DbEntity project){
        entityManager.merge(project);
    }

    public DbEntity delete(long id){
        DbEntity project = repo.getOne(id);
        repo.delete(id);
        return project;
    }

    public void deleteMultiple(Iterable<DbEntity> entities){
        repo.deleteInBatch(entities);
    }

    public void deleteAll(){
        repo.deleteAllInBatch();
    }


 // START OF SOURCE ASSEMBLY METHODS
//    public List<DbEntity> assemble(Project project){
//        List<DbEntity> entityList = getByProjectId(project.getId());
//        for(DbEntity entity : entityList){
//            List<Property>properties = pDao.getByEntityId(entity.getId());
////            ArrayList<Property>
////            for(Property property : properties){
//// SAVE THIS CODE FOR WRITING THE CLASS FILES
////                StringBuilder sb = new StringBuilder();
////               String s = sb.append(property.getType())
////                       .append(" ")
////                       .append(property.getName())
////                       .append(";").toString();
////                toReturn.add(s);
////                entity.getPropertyList().add(property);
////            }
//            entity.setPropertyList(properties);
//        }
//        return entityList;
//    }

}

