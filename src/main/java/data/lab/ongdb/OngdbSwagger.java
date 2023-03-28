package data.lab.ongdb;
/*
 *
 * Data Lab - graph database organization.
 *
 */

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.File;

/**
 * @author Yc-Ma
 * @PACKAGE_NAME: data.lab.ongdb.swagger
 * @Description: TODO(Swagger API文档配置属性类)
 * @date 2020/6/1 16:39
 */
@Configuration
@EnableSwagger2
public class OngdbSwagger {
    @Bean
    public Docket createSwagger() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("data.lab.ongdb"))
                .paths(PathSelectors.any())
                .build();
    }

    /**
     * http://localhost:7424/ongdb/v2/api-docs
     * https://localhost:7425/ongdb/v2/api-docs
     * http://localhost:7424/ongdb/swagger-ui.html
     * https://localhost:7425/ongdb/swagger-ui.html
     *
     * @param
     * @return
     * @Description: TODO
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                /*页面标题*/
                .title("DataLab图数据平台API服务")
                /*创建人*/
                .contact(new Contact("Graph Developer", "http://10.0.186.30/pages/viewpage.action?pageId=59605068", "mayc01@jsfund.cn"))

//                .extensions()
                .license("Apache 2.0")
                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
                .termsOfServiceUrl("")

                /*页面标题*/
                .description(new StringBuilder()
                        /**********************基础描述**********************/
                        .append("DataLab - graph database organization.")
                        .append("\n")
//                        .append(apiDescription())
                        .toString())
                /*版本号*/
                .version("1.2")
                .build();
    }

}


