# Graph QABot

---

Graph QABot Pages.

## 样例问题
- 设置样例问题，保存标签为`DEMO_QA`的节点，设置属性为label和qa
```cypher
//label为问题标签
//qa为样例问题
MATCH (n:DEMO_QA) RETURN n.label AS label,n.qa AS qa LIMIT 100;
```

## 安装过程
>在ONgDB图数据库安装以下过程，具体方法请看相关介绍文章。

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

## 依赖组件
[图数据库：ONgDB](https://github.com/graphfoundation/ongdb)

[ONgDB组件：ongdb-lab-apoc](https://github.com/ongdb-contrib/ongdb-lab-apoc)

## 效果展示


