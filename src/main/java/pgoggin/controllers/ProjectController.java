package pgoggin.controllers;

import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pgoggin.models.*;
import com.google.gson.Gson;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Type;
import java.util.*;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Controller
@RequestMapping("/")
public class ProjectController {
    
    @Autowired
    ProjectDaoImpl dao;

    @Autowired
    DbEntityDaoImpl eDao;

    @Autowired
    PropertyDaoImpl pDao;

    Gson gson = new Gson();

    @RequestMapping(value = {"/project"}, method = RequestMethod.POST)
    @ResponseBody
    public Project create(@RequestBody Project project, HttpServletRequest req) {
        Project e = dao.create(project);
        return e;
    }

    @RequestMapping(value = {"/assemble/{id}"}, method = RequestMethod.GET)
    @ResponseBody
    public Project assemble(@PathVariable("id") long id) {
        Project project = dao.get(id);
        Project summary = new Project();
        ArrayList<DbEntity> ents = new ArrayList<>(eDao.getByProjectId(id));
        HashSet<Long> entityKeys = new HashSet<>();
        HashMap<Long, ArrayList<Property>> map = new HashMap<>();
        ArrayList<Property>properties = new ArrayList<Property>(pDao.getByProjectId(id));
        for(Property p : properties){
            map.put(p.getEntityId(), new ArrayList<Property>());
        }
        for(Property p : properties){
            map.get(p.getEntityId()).add(p);
        }
        for(DbEntity d : ents){
            d.setPropertyList(map.get(d.getId()));
        }
        summary.setId(project.getId());
        summary.setName(project.getName());
        summary.setEntities(ents);
        summary.setBasePackage(project.getBasePackage());
        return summary;
    }

//    public ArrayList<Property> getEntityProperties(DbEntity e){
//        ArrayList<Property> fromDb = pDao.getByEntityId(e.getId());
//        ArrayList<Property> pp = new ArrayList<>();
//        for(int i = 0; i<fromDb.size(); i++){
//            pp.add(fromDb.get(i));
//        }
//        return pp;
//    }

    @RequestMapping(value = "/project/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Project getOne(@PathVariable("id") long id){
        Project project = dao.get(id);
        return project;
    }

    @RequestMapping(value = {"/projects"}, method = RequestMethod.GET)
    @ResponseBody
    public List<Project> getList(HttpServletRequest req) {
        List<Project> projects = dao.getAll();
        return projects;
    }

    @RequestMapping(value = {"/projects"}, method = RequestMethod.POST)
    @ResponseBody
    public void createMultiple(@RequestBody Iterable<Project> projects, HttpServletRequest req) {
        dao.createMultiple(projects);
    }

    @RequestMapping(value = {"/project/all"}, method = RequestMethod.GET)
    public List<Project> getAll(HttpServletRequest req) {
        return dao.getAll();
    }

    @RequestMapping(value = {"/project"}, method = RequestMethod.PATCH)
    @ResponseBody
    public Project update(@RequestBody Project project, HttpServletRequest req){
        dao.update(project);
        return dao.get(project.getId());
    }

    @RequestMapping(value = {"/project/delete/all"}, method = RequestMethod.DELETE)
    @ResponseBody
    public List<Project> deleteAll(HttpServletRequest req){
        dao.deleteAll();
        return new ArrayList<Project>();
    }

    @RequestMapping(value = {"/project/{id}"}, method = RequestMethod.DELETE)
    @ResponseBody
    public List<Project> delete(HttpServletRequest req, @PathVariable("id") String id){
        dao.delete(Long.parseLong(id));
        return dao.getAll();
    }
}
