package pgoggin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pgoggin.models.Project;
import pgoggin.models.Property;
import pgoggin.models.PropertyDaoImpl;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by patrickgoggin on 3/5/17.
 */
@Controller
@RequestMapping("/")
public class PropertyController {
    @Autowired
    PropertyDaoImpl dao;

    @RequestMapping(value = {"/property"}, method = RequestMethod.POST)
    @ResponseBody
    public Property create(@RequestBody Property property, HttpServletRequest req) {
        Property e = dao.create(property);
        return e;
    }

    @RequestMapping(value = {"/properties/{id}"}, method = RequestMethod.GET)
    @ResponseBody
    public List<Property> getList(@PathVariable("id") long id, HttpServletRequest req) {
        List<Property> properties = dao.getByEntityId(id);
        return properties;
    }

    @RequestMapping(value = "/property/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Property getOne(@PathVariable("id") long id){
        Property property = dao.get(id);
        return property;
    }

    @RequestMapping(value = {"/properties"}, method = RequestMethod.POST)
    @ResponseBody
    public void createMultiple(@RequestBody Iterable<Property> properties, HttpServletRequest req) {
        dao.createMultiple(properties);
    }

    @RequestMapping(value = {"/property"}, method = RequestMethod.PATCH)
    @ResponseBody
    public Property update(@RequestBody Property property, HttpServletRequest req){
        dao.update(property);
        return dao.get(property.getId());
    }

    @RequestMapping(value = {"/property/{id}"}, method = RequestMethod.DELETE)
    @ResponseBody
    public List<Property> delete(HttpServletRequest req, @PathVariable("id") String id){
        dao.delete(Long.parseLong(id));
        return dao.getAll();
    }

    //    @RequestMapping(value = {"/property/delete/all"}, method = RequestMethod.DELETE)
//    @ResponseBody
//    public List<Property> deleteAll(HttpServletRequest req){
//        dao.deleteAll();
//        return new ArrayList<Property>();
//    }
}
