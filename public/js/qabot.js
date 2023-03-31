const urlKey = 'qabot.ongdb.url'
const urlValue = 'localhost:7687'

const usernameKey = 'qabot.ongdb.username'
const usernameValue = 'ongdb'

const passwordKey = 'qabot.ongdb.password'
const passwordValue = '123456'

let driver = neo4j.v1.driver(
    'bolt://' + localStorage.getItem(urlKey),
    neo4j.v1.auth.basic(localStorage.getItem(usernameKey), localStorage.getItem(passwordKey))
)

//更新缓存
function updateStorage() {
    let httpUrl = document.getElementById('cql-http-text-input').value;
    let username = document.getElementById('cql-http-text-input-un').value;
    let password = document.getElementById('cql-http-text-input-pw').value;
    if (isNull(httpUrl)) {
        httpUrl = urlValue
    }
    if (isNull(usernameValue)) {
        username = usernameValue
    }
    if (isNull(passwordValue)) {
        password = passwordValue
    }
    localStorage.setItem(urlKey, httpUrl);
    localStorage.setItem(usernameKey, username);
    localStorage.setItem(passwordKey, password);
    driver = neo4j.v1.driver(
        'bolt://' + localStorage.getItem(urlKey),
        neo4j.v1.auth.basic(localStorage.getItem(usernameKey), localStorage.getItem(passwordKey))
    )
    console.log(driver)
}

function isNull(nmaGrad3phValue) {
    return nmaGrad3phValue === undefined || nmaGrad3phValue === null
}

//设置默认连接
function setStorage() {
    const httpUrl = localStorage.getItem(urlKey);
    const username = localStorage.getItem(usernameKey);
    const password = localStorage.getItem(passwordKey);
    document.querySelector('#cql-http-text-input').value = httpUrl;
    document.querySelector('#cql-http-text-input-un').value = username;
    document.querySelector('#cql-http-text-input-pw').value = password;
}

function getUrl() {
    return localStorage.getItem(urlKey).trim().toString() + '/db/data/transaction/commit';
}

$(function () {
    //获取问题标签列表
    getDemoQALabel();

    //默认加载的样例问题
    loadSampleQA();

    //从graph输入框提问
    $("#btn1").click(function () {
        //获取输入框内容
        var txt = document.getElementById('input_area').value;
        if (txt.length > 0) {
            var showdiv = document.getElementById('show_div');
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + txt + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            document.getElementById('input_area').value = '';
            showdiv.scrollTop = showdiv.scrollHeight;
            //调graph接口回答问题
            getfunqabot(txt);
        }

        //获取推荐问题列表
        getRecommend(txt);
    })

    //从chatGpt输入框提问
    $("#btnChat").click(function () {
        //获取输入框内容
        var txt = document.getElementById('chat_input_area').value;
        if (txt.length > 0) {
            var showdiv = document.getElementById('chat_div');
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + txt + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            document.getElementById('chat_input_area').value = '';
            showdiv.scrollTop = showdiv.scrollHeight;
            //调chatGpt接口回答问题
            getChatGPTfunqabot(txt);
        }
    })
})

function getDemoQALabel() {
    var session = driver.session()
    driver.session()
        .run('MATCH (n:DEMO_QA) RETURN DISTINCT n.label AS label LIMIT 10;', {})
        .then(function (result) {
            var ulNavigation = document.getElementById('ulNavigation');
            let htmlLabels = '';
            result.records.forEach(function (record) {
                const qaLabel = record.get('label')
                htmlLabels += "<li onclick=getQaListByLabel('" + qaLabel + "')>" + qaLabel + "</li>";
            })
            ulNavigation.innerHTML = htmlLabels
            session.close()
        })
        .catch(function (error) {
            console.log(error)
        })
}

function getQaListByLabel(label) {
    var session = driver.session()
    driver.session()
        .run('MATCH (n:DEMO_QA) WHERE n.label=\'' + label + '\' RETURN n.qa AS qa LIMIT 100;', {})
        .then(function (result) {
            $('#ul1').html('');
            result.records.forEach(function (record) {
                item = record.get('qa')
                $('#ul1').append("<li onclick=liClick('" + item + "')>" + item + "</li>")
            })
            session.close()
        })
        .catch(function (error) {
            console.log(error)
        })
}

function loadSampleQA() {
    var session = driver.session()
    driver.session()
        .run('MATCH (n:DEMO_QA) RETURN n.qa AS qa LIMIT 100;', {})
        .then(function (result) {
            $('#ul1').html('');
            result.records.forEach(function (record) {
                item = record.get('qa')
                $('#ul1').append("<li onclick=liClick('" + item + "')>" + item + "</li>")
            })
            session.close()
        })
        .catch(function (error) {
            console.log(error)
        })
}

//获取推荐问题
function getRecommend(val) {
    var session = driver.session()
    driver.session()
        .run('CALL custom.qabot.recommend_list(\'' + val + '\') YIELD raw_query,re_query,score RETURN raw_query,re_query,score;', {})
        .then(function (result) {
            var txt = '';
            result.records.forEach(function (record) {
                item = record.get('re_query')
                txt += item + '\n';
            })
            $('#input_area').val(txt);
            session.close()
        })
        .catch(function (error) {
            console.log(error)
        })
}

//调graph接口回答问题
function getfunqabot(val) {
    var session = driver.session()
    driver.session()
        .run('CALL custom.qabot(\'' + val + '\') YIELD result RETURN result;', {})
        .then(function (result) {
            var txt = '';
            result.records.forEach(function (record) {
                item = record.get('result')
                txt += item + '<br />'
            })
            if (txt !== '') {
                var showTxt = "【问题】：" + val;
                showTxt += "<hr style='width: 200px; margin-left: 10px;'/>"
                showTxt += txt;
                var showdiv = document.getElementById('show_div');
                //查询并绘制关系图谱
                getfunqabotgrqph(val);
                showdiv.innerHTML = showdiv.innerHTML + "<div style='float: left; display: flex; margin-top: 20px; width: 550px;' onclick=btnWinQuestgraph('" + val + "')><div class='chat_letf_item_GPT'>QABot</div><div class='chat_left_content'>" + showTxt + "</div></div>";

                showdiv.scrollTop = showdiv.scrollHeight;
                //获取cypher
                getCypher(val);
            } else {
                var showTxt = "【问题】：" + val;
                showTxt += "<hr style='width: 200px; margin-left: 10px;'/>"
                showTxt += "机器人有点繁忙，请稍后再试！";
                var showdiv = document.getElementById('show_div');
                //查询并绘制关系图谱
                getfunqabotgrqph(val);
                showdiv.innerHTML = showdiv.innerHTML + "<div style='float: left; display: flex; margin-top: 20px; width: 550px;' onclick=btnWinQuestgraph('" + val + "')><div class='chat_letf_item_GPT'>QABot</div><div class='chat_left_content'>" + showTxt + "</div></div>";

                showdiv.scrollTop = showdiv.scrollHeight;
            }
            session.close()
        })
        .catch(function (error) {
            console.log(error)
        })
}

//调chatGpt接口回答问题
function getChatGPTfunqabot(val) {
    $.ajax({
        url: 'http://openai:8080/qabot/single/session/chatGpt',
        type: "POST",
        dataType: "JSON",
        data: {
            qa: val
        },
        success: function (result) {
            var showTxt = "【问题】：" + val;
            showTxt += "<hr style='width: 200px; margin-left: 10px;'/>"
            showTxt += result.data;
            var showdiv = document.getElementById('chat_div');
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: left; display: flex; margin-top: 20px; width: 550px;'><div class='chat_letf_item_GPT'>ChatGPT</div><div class='chat_left_content'>" + showTxt + "</div></div>";
            showdiv.scrollTop = showdiv.scrollHeight;
        },
        error: function (result) {
            var showTxt = "【问题】：" + val;
            showTxt += "<hr style='width: 200px; margin-left: 10px;'/>"
            showTxt += 'ChatGPT服务繁忙，请稍后再试！';
            var showdiv = document.getElementById('chat_div');
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: left; display: flex; margin-top: 20px; width: 550px;'><div class='chat_letf_item_GPT'>ChatGPT</div><div class='chat_left_content'>" + showTxt + "</div></div>";
            showdiv.scrollTop = showdiv.scrollHeight;
        }
    });
}

//查询cypher
function getCypher(val) {
    var session = driver.session()
    driver.session()
        .run('CALL custom.qabot.cypher(\'' + val + '\') YIELD cypher RETURN cypher;', {})
        .then(function (result) {
            var txt = '';
            result.records.forEach(function (record) {
                item = record.get('cypher')
                $('#code1').html(item);
            })
            session.close()
        })
        .catch(function (error) {
            console.log(error)
        })
}

//点击左边列表提问
function liClick(val) {
    if ($('#answerId').val() == 0) {
        var showdiv = document.getElementById('show_div');
        if (val.indexOf("？") >= 0) {
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val.substring(0, val.indexOf("？") + 1) + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调接口回答问题
            getfunqabot(val.substring(0, val.indexOf("？") + 1));
        } else if (val.indexOf("?") >= 0) {
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val.substring(0, val.indexOf("?") + 1) + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调接口回答问题
            getfunqabot(val.substring(0, val.indexOf("?") + 1));
        } else {
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调接口回答问题
            getfunqabot(val);
        }
        showdiv.scrollTop = showdiv.scrollHeight;
    } else {
        var showdiv = document.getElementById('show_div');
        var chatdiv = document.getElementById('chat_div');
        if (val.indexOf("？") >= 0) {
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val.substring(0, val.indexOf("？") + 1) + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调graph接口回答问题
            getfunqabot(val.substring(0, val.indexOf("？") + 1));

            chatdiv.innerHTML = chatdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val.substring(0, val.indexOf("？") + 1) + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调ChatGPT接口回答问题
            getChatGPTfunqabot(val.substring(0, val.indexOf("？") + 1))

        } else if (val.indexOf("?") >= 0) {
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val.substring(0, val.indexOf("?") + 1) + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调接口回答问题
            getfunqabot(val.substring(0, val.indexOf("?") + 1));

            chatdiv.innerHTML = chatdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val.substring(0, val.indexOf("?") + 1) + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调ChatGPT接口回答问题
            getChatGPTfunqabot(val.substring(0, val.indexOf("?") + 1))

        } else {
            showdiv.innerHTML = showdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调接口回答问题
            getfunqabot(val);

            chatdiv.innerHTML = chatdiv.innerHTML + "<div style='float: right; display: flex; margin-top: 20px; margin-left: 100px;'><div class='chat_right_content'>" + val + "</div>" + "<div class='chat_right_item_1'>me</div></div>";
            //调ChatGPT接口回答问题
            getChatGPTfunqabot(val);
        }
        showdiv.scrollTop = showdiv.scrollHeight;
        chatdiv.scrollTop = chatdiv.scrollHeight;
    }
}

//点击聊天窗口答案显示对应的图谱和cypher
function btnWinQuestgraph(val) {
    //获取cypher
    getCypher(val)
    //获取图谱
    getfunqabotgrqph(val)
}

function btnWinQuest(val) {
    //获取cypher
    getCypher(val)
    //清除图谱
    d3.select('svg').selectAll('*').remove();
}

function packNode(node) {
    var jsonNode = {};
    jsonNode.id = node.elementId;

    if (node.properties.value !== '' && node.properties.value !== undefined) {
        jsonNode.name = node.properties.value.toString();
    } else if (node.properties.name !== '' && node.properties.name !== undefined) {
        jsonNode.name = node.properties.name.toString();
    } else {
        const map = new Map(Object.entries(node.properties))
        let txt = '';
        map.forEach(function (value, key) {
            txt += key + ':' + value + ' ';
        })
        jsonNode.name = txt;
    }
    jsonNode.labels = node.labels[0];
    return jsonNode;
}

function packRel(rel) {
    var jsonLink = {};
    jsonLink.src = rel.startNodeElementId;
    jsonLink.id = rel.elementId;
    jsonLink.type = rel.type;
    jsonLink.dst = rel.endNodeElementId;
    return jsonLink;
}

//获取图谱
function getfunqabotgrqph(val) {
    var session = driver.session()
    driver.session()
        .run('CALL custom.qabot.graph(\''+val+'\') YIELD path RETURN path;', {})
        .then(function (result) {
            var nodeList = [];
            var linkList = [];
            result.records.forEach(function (record) {
                path = record.get('path')
                nodeList.push(packNode(path.start));
                nodeList.push(packNode(path.end));
                path.segments.forEach(function (p) {
                    nodeList.push(packNode(p.start));
                    nodeList.push(packNode(p.end));
                    linkList.push(packRel(p.relationship));
                })

            })
            drawGraph(nodeList, linkList);
            session.close()
        })
        .catch(function (error) {
            console.log(error)
        })
}

//去重
function unique(arr, type) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[type]) && res.set(a[type], 1));
}

//绘制图谱
function drawGraph(nodeList, linkList) {
    d3.select('svg').selectAll('*').remove();

    //去除重复节点
    nodeList = unique(nodeList, "id");

    const data = {
        nodes: nodeList,
        links: linkList,
    };

    const {nodes, links} = data;
    var divElmnt = document.getElementById("graphDiv");
    const width = divElmnt.clientWidth;
    const height = divElmnt.clientHeight;
    formatLink(links, nodes);
    formatNode(nodes);

    const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).distance(200))
        .force("charge", d3.forceManyBody().strength(-200).distanceMax(100))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on('tick', tick)

    // 创建一个根容器，用于存放要画的图形
    const container = d3
        .select("svg")
        .append("g")
        .attr("class", "container");

    // 绘制箭头
    drawMarker();
    // 绘制连接线
    drawLinkPath(container, links);
    // 绘制关系文本
    drawRelationText(container, links);

    // 圆圈和文字的外层g，可以在这个上面添加点击、hover事件
    let nodeSelection = container
        .append("g")
        .attr("class", "nodegroup")
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append('g')
        .attr("id", d => {
            return d.idx
        });

    // 遍历绘制圆圈和圆圈上的文本
    nodeSelection.each(d => {
        drawCircle(d.idx)
        drawText(d.idx);
    })

    // ===== 拖拽 =====
    const dragFunc = d3
        .drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragend);

    dragFunc(nodeSelection);

    function dragStarted(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0.01).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragend(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

// ===== 绘图 =====
function drawMarker() {
    d3.select('svg')
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "blueMarker")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 70)
        .attr("refY", 0)
        .attr('markerUnits', 'userSpaceOnUse')
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5").attr('fill', '#4099ea')
}

function drawCircle(id) {
    const circleG = d3
        .select(`#${id}`)
        .attr('class', 'circle-g');
    circleG
        .append("circle")
        .attr("class", "real-circle")
        .attr("fill", d => {
            if (d.labels === '发行日期') {
                return '#fe5557';
            }
            if (d.labels === '基金产品') {
                return '#2E8B57';
            }
            return '#52a3eb';
        })
        // 设置圆圈半径
        .attr("r", d => {
            return 35;
        })
}

function drawText(id) {
    d3.select(`#${id}`)
        .insert("text")
        .attr('class', 'circle-text')
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr('font-size', 12)
        .style('fill', function (node) {
            return '#cecccc';
        })
        .attr('y', d => {
            return d.x
        })
        .attr('x', function (d) {
            let re_en = /[a-zA-Z]+/g;
            //如果是全英文，不换行
            if (d.name.match(re_en)) {
                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 2)
                    .text(function () {
                        return d.name;
                    });
            }
            //如果小于四个字符，不换行
            else if (d.name.length <= 4) {
                d3.select(this).append('tspan')
                    .attr('x', -2)
                    .attr('y', 2)
                    .text(function () {
                        return d.name;
                    });
            } else if (d.name.length > 4 && d.name.length <= 8) {//大于4  这两行
                let top = d.name.substring(0, 4);
                let bot = d.name.substring(4, d.name.length);

                d3.select(this).text(function () {
                    return '';
                });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', -7)
                    .text(function () {
                        return top;
                    });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 10)
                    .text(function () {
                        return bot;
                    });
            }
            // 文字长度大于8 折三行
            else if (d.name.length > 8 && d.name.length <= 12) {
                let top = d.name.substring(0, 4);
                let bot = d.name.substring(4, 8);
                let bot1 = d.name.substring(8, d.name.length);

                d3.select(this).text(function () {
                    return '';
                });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', -15)
                    .text(function () {
                        return top;
                    });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 2)
                    .text(function () {
                        return bot;
                    });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 16)
                    .text(function () {
                        return bot1;
                    });

            }
            //文字长度大于12 折四行
            else if (d.name.length > 12 && d.name.length <= 16) {

                let top = d.name.substring(0, 4);
                let bot = d.name.substring(4, 8);
                let bot1 = d.name.substring(8, 12);
                let bot2 = d.name.substring(12, d.name.length);

                d3.select(this).text(function () {
                    return '';
                });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', -20)
                    .text(function () {
                        return top;
                    });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', -3)
                    .text(function () {
                        return bot;
                    });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 10)
                    .text(function () {
                        return bot1;
                    });
                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 23)
                    .text(function () {
                        return bot2;
                    });


            } else if (d.name.length > 16) {//文字长度大于16  方案
                let top = d.name.substring(0, 4);
                let bot = d.name.substring(4, 8);
                let bot1 = d.name.substring(8, 12);
                let bot2 = d.name.substring(12, 14);

                bot2 += '...'
                d3.select(this).text(function () {
                    return '';
                });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', -22)
                    .text(function () {
                        return top;
                    });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', -7)
                    .text(function () {
                        return bot;
                    });

                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 10)
                    .text(function () {
                        return bot1;
                    });
                d3.select(this).append('tspan')
                    .attr('x', 0)
                    .attr('y', 25)
                    .text(function () {
                        return bot2;
                    });
            }
        })
}

function drawLinkPath(container, links) {
    // 添加连接路径path
    container
        .append("g")
        .attr("class", "line-path")
        .selectAll(".path")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "path")
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#D8D8D8")
        .attr("marker-end", function (d) {
            let id = "blueMarker";
            return `url(#${id})`;
        })
        .attr('cursor', 'pointer');
}

function drawRelationText(container, links) {
    //边上的文字（人物之间的关系）
    let edges_text =
        container
            .append('g')
            .attr('class', 'relation-text')
            .selectAll('.linetext')
            .data(links)
            .enter()
            .append("svg:g")
            .attr("class", "linetext")
            .attr("fill-opacity", 1)


    edges_text.append("svg:text")
        .attr("font-size", 10)
        .attr("fill", "#8e8e8e")
        .attr("y", ".31em")
        .attr('text-anchor', "middle")
        .text(function (d) {
            return d.type;
        });

    edges_text.insert('rect', 'text')
        .attr('width', function (d, i, e) {
            const {width} = e[i].parentNode.getBoundingClientRect()
            return width;
        })
        .attr('height', function (d) {
            return 14;
        })
        .attr("y", "-.5em")
        .attr('x', function (d, i, e) {
            const {width} = e[i].nextSibling.getBoundingClientRect()
            return -width / 2;
        })
        .attr('fill', 'rgba(255,255,255,.5)');

    // ===== 缩放 =====
    initZoom();

    function initZoom() {
        const zoom = d3
            .zoom()
            .scaleExtent([0.2, 5])
            .on("zoom", () => {
                let transform = d3.event.transform;
                return container.attr(
                    "transform",
                    `translate(${transform.x},${transform.y})scale(${transform.k})`
                );
            });

        //动画持续时间
        container
            .transition()
            .duration(300)
            .call(zoom.transform, d3.zoomIdentity);
        d3.select("svg")
            .call(zoom)
            // 取消默认的双击放大事件
            .on("dblclick.zoom", null);
    }
}

function formatNode(nodes) {
    nodes.forEach((node) => {
        node.idx = "zf" + uuid();
    });
}

// 格式化连接关系数据
function formatLink(links, nodes) {
    links.forEach((link, i) => {
        link.index = i;
        const src = nodes.find((node) => node.id == link.src);
        const dst = nodes.find((node) => node.id == link.dst);
        link["source"] = src;
        link["target"] = dst;
    });
}

function uuid() {
    return Math.random().toString(34).replaceAll(/\,|\./g, '')
}

// ===== 更新 =====
function tick() {
    updateLinkLine();
    updateCircleAndText();
    updateLinkRelationText();
}

function updateCircleAndText() {
    d3.selectAll("circle")
        .attr("cx", (d) => {
            return d.x
        })
        .attr("cy", (d) => d.y);
    d3.selectAll(".circle-text").attr("transform", (d) => {
        return `translate(${d.x},${d.y})`;
    });
}

function updateLinkLine() {
    const edges_line = d3.selectAll(".path");
    edges_line.attr("d", function (d) {
        return "M" + d.source.x + " " + d.source.y + " L " + d.target.x + " " + d.target.y
    });
}

function updateLinkRelationText() {
    const svg = d3.select("svg");
    let edges_text = svg.selectAll(".linetext");

    //更新连接线上文字的位置
    edges_text.attr("transform", function (d) {
        let translateX = (d.source.x + d.target.x) / 2;
        let translateY = (d.source.y + d.target.y) / 2;
        return `translate(${translateX},${translateY}) rotate(0)`;
    });
}

//切换回答问题方式
function answerType() {
    if ($('#btnGraph').text() === '>>') {
        $('#answerId').val(1);
        $('#chatDptDiv').show();
        $('#div0').css("width", "2450px");
        $('#btnGraph').text('<<');
    } else {
        $('#answerId').val(0);
        $('#chatDptDiv').hide();
        $('#div0').css("width", "1800px");
        $('#btnGraph').text('>>');
    }
}

//关闭chatGpt聊天窗口
function answerChat() {
    $('#answerId').val(0);
    $('#chatDptDiv').hide();
    $('#div0').css("width", "1800px");
    $('#btnGraph').text('>>');
}