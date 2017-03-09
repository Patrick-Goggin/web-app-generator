//package pgoggin.utilities;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//
//import javax.servlet.ServletContext;
//import java.io.File;
//import java.io.FileWriter;
//import java.io.IOException;
//
//
///**
// * Created by patrickgoggin on 3/3/17.
// */
//@Component
//public class WriterImpl implements Writer{
//
//    @Autowired
//    ServletContext ctx;
//
//    @Override
//    public String read(String file, Css css){
//
//        return "";
//    }
//
//    @Override
//    public void writeFile(Css css, String file){
//        write(css, file);
//    }
//
//    @Override
//    public void write(Css css, String file){
//        String styleSheet = css.getCss();
//        File fileLocation = new File("src/main/resources/static/added/"+file);
//        try {
//            FileWriter fw = new FileWriter(fileLocation);
//            fw.write(styleSheet);
//            fw.flush();
//            fw.close();
//        } catch (IOException e) {
//        e.printStackTrace();
//        System.out.println("Write failed.");
//        }
//    }
//}
