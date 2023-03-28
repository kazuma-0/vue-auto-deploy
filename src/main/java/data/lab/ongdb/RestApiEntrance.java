package data.lab.ongdb;
/*
 *
 * Data Lab - graph database organization.
 *
 */

import org.apache.catalina.connector.Connector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;

/**
 * @author Yc-Ma
 * @PACKAGE_NAME: data.lab.ongdb.RestApiEntrance
 * @Description: TODO
 * @date 2020/5/31 13:11
 */

@SpringBootApplication
public class RestApiEntrance {

    private final static Logger LOGGER = LoggerFactory.getLogger(RestApiEntrance.class);

//    private static FileListener fileListener;

//    @Autowired
//    public void setFileListener(FileListener fileListener){
//        this.fileListener = fileListener;
//    }

    public static void main(String[] args) {
        SpringApplication.run(RestApiEntrance.class, args);
//        fileListener.FileFilter();
        LOGGER.info("Launch successfully!");
    }

    @Bean
    public ServletWebServerFactory servletContainer() {
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
        tomcat.addAdditionalTomcatConnectors(createHTTPConnector());
        return tomcat;
    }

    private Connector createHTTPConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        /**
         * 启用http（7424）、https（7425）两个端口
         * **/
        connector.setScheme("http");
        connector.setSecure(false);
        connector.setPort(7424);
        connector.setRedirectPort(7425);
        return connector;
    }
}

