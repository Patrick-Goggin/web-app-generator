package pgoggin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pgoggin.models.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import static com.sun.tools.doclets.formats.html.markup.HtmlStyle.summary;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Controller
@RequestMapping("/")
public class DbEntityController {
    @Autowired
    DbEntityDaoImpl dao;

    @Autowired
    PropertyDaoImpl pDao;

    @RequestMapping(value = {"/entity"}, method = RequestMethod.POST)
    @ResponseBody
    public DbEntity create(@RequestBody DbEntity entity, HttpServletRequest req) {
        DbEntity e = dao.create(entity);
        return e;
    }

    @RequestMapping(value = "/entity/{id}", method = RequestMethod.GET)
    @ResponseBody
    public DbEntity getOne(@PathVariable("id") long id){
        DbEntity entity = dao.get(id);
        return entity;
    }

    @RequestMapping(value = {"/entities/{id}"}, method = RequestMethod.GET)
    @ResponseBody
    public List<DbEntity> getList(@PathVariable("id") long id, HttpServletRequest req) {
       // Project project = dao.get(id);
      //  Project summary = new Project();
        List<DbEntity> ents = new ArrayList<>(dao.getByProjectId(id));
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
//        summary.setId(project.getId());
//        summary.setName(project.getName());
//        summary.setEntities(ents);
        return ents;
    }

    @RequestMapping(value = {"/entities"}, method = RequestMethod.POST)
    @ResponseBody
    public void createMultiple(@RequestBody Iterable<DbEntity> entities, HttpServletRequest req) {
        dao.createMultiple(entities);
    }

//    @RequestMapping(value = {"/entity/all"}, method = RequestMethod.GET)
//    public List<DbEntity> getAll(HttpServletRequest req) {
//        return dao.getAll();
//    }

    @RequestMapping(value = {"/entity"}, method = RequestMethod.PATCH)
    @ResponseBody
    public DbEntity update(@RequestBody DbEntity entity, HttpServletRequest req){
        dao.update(entity);
        return dao.get(entity.getId());
    }

    @RequestMapping(value = {"/entity"}, method = RequestMethod.DELETE)
    @ResponseBody
    public List<DbEntity> deleteAll(HttpServletRequest req){
        dao.deleteAll();
        return new ArrayList<DbEntity>();
    }

    @RequestMapping(value = {"/entity/{id}"}, method = RequestMethod.DELETE)
    @ResponseBody
    public List<DbEntity> delete(HttpServletRequest req, @PathVariable("id") String id){
        dao.delete(Long.parseLong(id));
        return dao.getAll();
    }
}
