package data.lab.ongdb.controller;
/*
 *
 * Data Lab - graph database organization.
 *
 */

import io.swagger.annotations.Api;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

/**
 * @author Yc-Ma
 * @PACKAGE_NAME: data.lab.ongdb.controller
 * @Description: TODO
 * @date 2022/9/30 9:36
 */
@Controller
/**
 * 支持跨源请求
 * **/
@CrossOrigin(origins = "*", maxAge = 3600)
@Api(tags = "qabot", value = "qabot", description = "图谱问答")
public class QABot {

    /**
     * @param
     * @return
     * @Description: TODO(图数据服务平台主页)
     */
    @RequestMapping(method = RequestMethod.GET)
    public String index(ModelMap modelMap) {
        modelMap.put("msg", "图谱问答");
        return "index";
    }

}

