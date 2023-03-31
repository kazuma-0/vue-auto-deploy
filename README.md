# Graph QABot

---

Graph QABot Pages.

## 完整操作案例指南
>根据案例指南安装图数据库和对应组件，并构建图数据，配置问答工具后即可运行问答系统。
[graph-qabot-demo](https://github.com/ongdb-contrib/graph-qabot-demo)

## 样例问题设置方法
- 设置样例问题，保存标签为`DEMO_QA`的节点，设置属性为label和qa
```cypher
//label为问题标签
//qa为样例问题
MATCH (n:DEMO_QA) RETURN n.label AS label,n.qa AS qa LIMIT 100;
```

## 问答工具依赖的过程安装
>在ONgDB图数据库安装以下过程，具体方法请看graph-qabot-demo相关介绍文章。

- 根据输入的问题生成推荐问题列表
```cypher
CALL custom.qabot.recommend_list('{qa}') YIELD raw_query,re_query,score RETURN raw_query,re_query,score;
```

- 单轮问答过程
```cypher
CALL custom.qabot('{qa}') YIELD result RETURN result;
```

- 问答生成的Cypher查询
```cypher
CALL custom.qabot.cypher('{qa}') YIELD cypher RETURN cypher;
```

- 问答图谱生成
```cypher
CALL custom.qabot.graph('{qa}') YIELD path RETURN path;
```

## 问答系统依赖的组件
- 图数据库ONgDB-1.x
[图数据库：ONgDB](https://github.com/graphfoundation/ongdb)

- OLAB组件1.x
[ONgDB组件：ongdb-lab-apoc](https://github.com/ongdb-contrib/ongdb-lab-apoc)

- ONgDB-APOC组件3.4.x
[ongdb-apoc](https://github.com/graphfoundation/ongdb-apoc)

- 建模工具
[Graphene图数据建模工具](https://github.com/ongdb-contrib/graphene)

## 效果展示


