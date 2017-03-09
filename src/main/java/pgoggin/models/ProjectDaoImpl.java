package pgoggin.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Component
@Transactional
public class ProjectDaoImpl {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    ProjectRepository repo;


    public Project create(Project project){
        repo.save(project);
        return project;
    }

    public void createMultiple(Iterable<Project> projects){
        repo.save(projects);
    }

    public List<Project> getAll(){
        List<Project> list = repo.findAll();
        return list;
    }

    public Project get(long id){
        Project project = repo.getOne(id);
        return project;
    }

    public List<Project> getByName(String name){
        List<Project> projects = entityManager.createQuery("from Project where name = :name").setParameter("name", name).getResultList();
        return projects;
    }

    public void update(Project project){
        entityManager.merge(project);
    }

    public Project delete(long id){
        Project project = repo.getOne(id);
        repo.delete(id);
        return project;
    }

    public void deleteMultiple(Iterable<Project> projects){
        repo.deleteInBatch(projects);
    }

    public void deleteAll(){
        repo.deleteAllInBatch();
    }

}
