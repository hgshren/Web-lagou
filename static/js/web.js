// echarts
const chartStore = {
    pie: null,
    bar: null,
    line: null,
}

const optionForPie = function(data) {
    var option = {
        title: {
            text: '广州Web前端各区招聘占比',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '地区占比',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }

    return option
}

const optionForArea = function(site) {
    const data = _.map(site, (v, k) => {
        const o = {
            name: k,
            value: v.length,
        }
        return o
    })
    const option = optionForPie(data)
    return option
}

const optionForBar = function(data) {
    const option = {
        title: {
            text: '广州Web前端招聘岗位按待遇划分',
        },
        xAxis: {
            data: data.axis,
            name: '薪资待遇',
            axisLabel: {
                textStyle: {
                    color: '#000'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 10
        },
        yAxis: {
            name: '岗位数量',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                animation: false
            },
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data.data
            }
        ]
    }
    return option
}

const optionForType = function(money) {
    const data = {
        axis: [],
        data: [],
    }
    _.each(money, (v, k) => {
        data.axis.push(k)
        data.data.push(v.length)
    })
    const option = optionForBar(data)
    return option
}

const optionForLine = function(data) {
    const option = {
        title: {
            text: '招聘数量'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0]
                var value = params.value
                var s = value[0] + ': ' + value[1]
                return s
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            name: '招聘时间',
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: '数量',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            min: 8,
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };
    return option
}

const optionForYear = function(year) {
    const data = _.map(year, (v, k) => {
        const avg = _.meanBy(v, 'score')
        const o = {
            name: k,
            value: [k, avg.toFixed(2)],
        }
        return o
    })
    const option = optionForLine(data)
    return option
}

const renderChart = function(d) {
    const data = d

    const site = _.groupBy(data, 'site')
    const siteOption = optionForArea(site)
    const pie = chartStore.pie
    pie.setOption(siteOption)

    const money = _.groupBy(data, 'money')
    const moneyOption = optionForType(money)
    const bar = chartStore.bar
    bar.setOption(moneyOption)

    // const year = _.groupBy(data, 'year')
    // const yearOption = optionForYear(year)
    // const line = chartStore.line
    // line.setOption(yearOption)
}

const webJSON = function() {
    var d = [
        {
          "company": "24好玩",
          "money": "6k-10k",
          "site": "萝岗区",
          "time": "1天前发布",
          "industry": "\n                                企业服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "百朋科技",
          "money": "8k-15k",
          "site": "新港",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "奥威亚",
          "money": "8k-12k",
          "site": "天河区",
          "time": "00:27发布",
          "industry": "\n                                移动互联网,教育 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "优投金服",
          "money": "8k-12k",
          "site": "沙河",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,金融 / 初创型(未融资)\n                            "
        },
        {
          "company": "艾美网络科技",
          "money": "7k-14k",
          "site": "广州",
          "time": "15:39发布",
          "industry": "\n                                移动互联网,游戏 / 初创型(天使轮)\n                            "
        },
        {
          "company": "CLPS",
          "money": "8k-15k",
          "site": " 越秀区",
          "time": "3天前发布",
          "industry": "\n                                数据服务,金融 / 初创型(未融资)\n                            "
        },
        {
          "company": "奇化网",
          "money": "8k-16k",
          "site": "车陂",
          "time": "1天前发布",
          "industry": "\n                                电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "奇艺果",
          "money": "13k-20k",
          "site": "琶洲",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 成熟型(C轮)\n                            "
        },
        {
          "company": "万表",
          "money": "15k-20k",
          "site": "番禺区",
          "time": "1天前发布",
          "industry": "\n                                移动互联网,电子商务 / 成长型(B轮)\n                            "
        },
        {
          "company": "起秀信息科技",
          "money": "8k-12k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                O2O,电子商务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "爱范儿",
          "money": "7k-14k",
          "site": "客村",
          "time": "18:43发布",
          "industry": "\n                                移动互联网,企业服务 / 上市公司\n                            "
        },
        {
          "company": "广州麒云萱韬信息科技有限公司",
          "money": "10k-20k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,企业服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "惠吃猫",
          "money": "10k-14k",
          "site": "琶洲",
          "time": "12:13发布",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "趣丸",
          "money": "10k-20k",
          "site": "棠下",
          "time": "3天前发布",
          "industry": "\n                                游戏 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "翼课网",
          "money": "10k-20k",
          "site": "番禺区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 ,教育 / 成长型(B轮)\n                            "
        },
        {
          "company": "ZAKER",
          "money": "8k-12k",
          "site": "五山",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成熟型(C轮)\n                            "
        },
        {
          "company": "铂涛旅行",
          "money": "12k-18k",
          "site": "海珠区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,旅游 / 初创型(未融资)\n                            "
        },
        {
          "company": "路人甲软件",
          "money": "10k-15k",
          "site": "石牌",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "MAKA",
          "money": "8k-16k",
          "site": "新港",
          "time": "2天前发布",
          "industry": "\n                                企业服务,移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "爱范儿",
          "money": "7k-10k",
          "site": "海珠区",
          "time": "18:43发布",
          "industry": "\n                                移动互联网,企业服务 / 上市公司\n                            "
        },
        {
          "company": "车主无忧",
          "money": "7k-10k",
          "site": "岗顶",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "省广诺时信息服务有限公司",
          "money": "10k-15k",
          "site": "石牌",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,广告营销 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "唯品会",
          "money": "15k-25k",
          "site": "白鹅潭",
          "time": "2017-04-01",
          "industry": "\n                                电子商务 / 上市公司\n                            "
        },
        {
          "company": "机智云",
          "money": "7k-14k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,硬件 / 成长型(B轮)\n                            "
        },
        {
          "company": "数夫软件",
          "money": "13k-20k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "沐思信息",
          "money": "10k-20k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "联合数据公司",
          "money": "12k-24k",
          "site": "建设",
          "time": "2017-04-11",
          "industry": "\n                                数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "广州犁牛网络科技有限公司",
          "money": "8k-10k",
          "site": "天河北",
          "time": "2天前发布",
          "industry": "\n                                电子商务,移动互联网 / 上市公司\n                            "
        },
        {
          "company": "方欣科技",
          "money": "10k-15k",
          "site": "萝岗区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "选师无忧",
          "money": "8k-12k",
          "site": "五山",
          "time": "2天前发布",
          "industry": "\n                                电子商务,教育 / 成长型(A轮)\n                            "
        },
        {
          "company": "省广诺时信息服务有限公司",
          "money": "10k-15k",
          "site": "石牌",
          "time": "2017-03-23",
          "industry": "\n                                移动互联网,广告营销 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "路客",
          "money": "8k-15k",
          "site": "大石",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "神州信息",
          "money": "9k-15k",
          "site": "棠下",
          "time": "2017-04-07",
          "industry": "\n                                移动互联网,企业服务 / 上市公司\n                            "
        },
        {
          "company": "宙讯达网络",
          "money": "20k-30k",
          "site": "天河区",
          "time": "1天前发布",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "迈傲科技",
          "money": "10k-15k",
          "site": "萝岗区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "神算子教育",
          "money": "10k-20k",
          "site": "琶洲",
          "time": "3天前发布",
          "industry": "\n                                教育 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "路人甲软件",
          "money": "12k以上",
          "site": "石牌",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "卓动信息科技",
          "money": "10k-18k",
          "site": "棠下",
          "time": "3天前发布",
          "industry": "\n                                游戏 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "蓝盾信息安全技术股份有限公司",
          "money": "8k-12k",
          "site": "棠下",
          "time": "2017-04-10",
          "industry": "\n                                信息安全 / 上市公司\n                            "
        },
        {
          "company": "酷狗音乐",
          "money": "10k-20k",
          "site": "沙河",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,文化娱乐 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "美云智数",
          "money": "8k-16k",
          "site": "番禺区",
          "time": "2017-04-11",
          "industry": "\n                                企业服务,数据服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "凡科",
          "money": "12k-18k",
          "site": "工业大道",
          "time": "1天前发布",
          "industry": "\n                                企业服务 / 上市公司\n                            "
        },
        {
          "company": "万丈金数",
          "money": "10k-15k",
          "site": "天园",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,电子商务 / 成长型(B轮)\n                            "
        },
        {
          "company": "腾米克(TENMIC)",
          "money": "9k-18k",
          "site": "越秀区",
          "time": "2017-03-28",
          "industry": "\n                                企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "广东道一",
          "money": "8k-15k",
          "site": "天河公园",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "神算子教育",
          "money": "10k-20k",
          "site": "琶洲",
          "time": "3天前发布",
          "industry": "\n                                教育 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "广州亿博",
          "money": "11k-16k",
          "site": "白云区",
          "time": "14:22发布",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "腾讯•大粤网",
          "money": "10k-20k",
          "site": "五羊新城",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,O2O / 初创型(未融资)\n                            "
        },
        {
          "company": "网金控股",
          "money": "15k-22k",
          "site": "珠江新城",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "爱拍原创",
          "money": "6k-10k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                文化娱乐 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "乐行",
          "money": "12k-24k",
          "site": "五山",
          "time": "1天前发布",
          "industry": "\n                                金融,移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "4399游戏",
          "money": "9k-12k",
          "site": "石牌",
          "time": "2天前发布",
          "industry": "\n                                游戏 / 初创型(未融资)\n                            "
        },
        {
          "company": "广东智源",
          "money": "4k-6k",
          "site": "越秀区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广发证券",
          "money": "25k-35k",
          "site": "跑马场",
          "time": "2017-04-07",
          "industry": "\n                                金融 / 上市公司\n                            "
        },
        {
          "company": "派派猪理财",
          "money": "6k-8k",
          "site": "天河区",
          "time": "2017-04-11",
          "industry": "\n                                金融 / 初创型(未融资)\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "8k-12k",
          "site": "员村",
          "time": "2017-03-27",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "万丈金数",
          "money": "5k-8k",
          "site": "天园",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,电子商务 / 成长型(B轮)\n                            "
        },
        {
          "company": "合利宝",
          "money": "12k-18k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,金融 / 成长型(A轮)\n                            "
        },
        {
          "company": "爱菩新医药科技",
          "money": "13k-16k",
          "site": "石牌",
          "time": "2天前发布",
          "industry": "\n                                医疗健康,数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "广东道一",
          "money": "5k-8k",
          "site": "天河公园",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "网金控股",
          "money": "8k-16k",
          "site": "珠江新城",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "广东智源",
          "money": "1k-2k",
          "site": "越秀区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "合利宝",
          "money": "12k-18k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,金融 / 成长型(A轮)\n                            "
        },
        {
          "company": "金冠科技",
          "money": "5k-10k",
          "site": "萝岗区",
          "time": "2017-04-12",
          "industry": "\n                                电子商务 / 上市公司\n                            "
        },
        {
          "company": "支点网络",
          "money": "10k-20k",
          "site": "元岗",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网,社交网络 / 成长型(B轮)\n                            "
        },
        {
          "company": "小妖传媒",
          "money": "8k-16k",
          "site": "天河区",
          "time": "15:02发布",
          "industry": "\n                                移动互联网,社交网络 / 初创型(未融资)\n                            "
        },
        {
          "company": "三七互娱",
          "money": "15k-20k",
          "site": "天园",
          "time": "3天前发布",
          "industry": "\n                                游戏 / 上市公司\n                            "
        },
        {
          "company": "互动派科技股份有限公司",
          "money": "15k-19k",
          "site": "跑马场",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网,广告营销 / 上市公司\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "15k-25k",
          "site": "员村",
          "time": "2017-03-17",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "btops",
          "money": "6k-8k",
          "site": "五山",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,广告营销 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "财略金融科技",
          "money": "7k-12k",
          "site": "客村",
          "time": "2017-03-29",
          "industry": "\n                                金融 / 成长型(A轮)\n                            "
        },
        {
          "company": "网易",
          "money": "10k-15k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                数据服务,文化娱乐 / 上市公司\n                            "
        },
        {
          "company": "大洋信息",
          "money": "7k-12k",
          "site": "石牌",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 上市公司\n                            "
        },
        {
          "company": "新的美地",
          "money": "6k-9k",
          "site": "滨江",
          "time": "2天前发布",
          "industry": "\n                                电子商务,移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "酷狗音乐",
          "money": "8k-10k",
          "site": "车陂",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,文化娱乐 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "金冠科技",
          "money": "10k-15k",
          "site": "萝岗区",
          "time": "2017-04-12",
          "industry": "\n                                电子商务 / 上市公司\n                            "
        },
        {
          "company": "三七互娱",
          "money": "10k-20k",
          "site": "天河公园",
          "time": "3天前发布",
          "industry": "\n                                游戏 / 上市公司\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "15k-30k",
          "site": "天河区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "电动汽车时代网",
          "money": "4k-8k",
          "site": "白云区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,生活服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "Mobvista",
          "money": "18k-35k",
          "site": "天河区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,游戏 / 上市公司\n                            "
        },
        {
          "company": "EIDcenter",
          "money": "8k-15k",
          "site": "江南大道",
          "time": "2017-04-01",
          "industry": "\n                                移动互联网,文化娱乐 / 成长型(B轮)\n                            "
        },
        {
          "company": "DataStory",
          "money": "15k-19k",
          "site": "广州",
          "time": "2017-03-31",
          "industry": "\n                                数据服务 / 成长型(B轮)\n                            "
        },
        {
          "company": "租租车",
          "money": "8k-12k",
          "site": "体育中心",
          "time": "2天前发布",
          "industry": "\n                                旅游,生活服务 / 成长型(B轮)\n                            "
        },
        {
          "company": "算易",
          "money": "8k-15k",
          "site": "琶洲",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,信息安全 / 初创型(未融资)\n                            "
        },
        {
          "company": "神算子教育",
          "money": "10k-20k",
          "site": "琶洲",
          "time": "2017-03-15",
          "industry": "\n                                教育 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "广东道一",
          "money": "4k-6k",
          "site": "天河公园",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "猎牛",
          "money": "4k-6k",
          "site": "广州大道南",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,金融 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "沐思信息",
          "money": "12k-24k",
          "site": "棠下",
          "time": "2017-03-24",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "起秀信息科技",
          "money": "10k-15k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                O2O,电子商务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "邢帅教育",
          "money": "9k-18k",
          "site": "番禺区",
          "time": "2017-04-07",
          "industry": "\n                                电子商务,教育 / 成长型(B轮)\n                            "
        },
        {
          "company": "租租车",
          "money": "10k-18k",
          "site": "体育中心",
          "time": "2天前发布",
          "industry": "\n                                旅游,生活服务 / 成长型(B轮)\n                            "
        },
        {
          "company": "Mobvista",
          "money": "10k-20k",
          "site": "天河区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,游戏 / 上市公司\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "15k-30k",
          "site": "天河区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "神算子教育",
          "money": "10k-20k",
          "site": "琶洲",
          "time": "2017-03-15",
          "industry": "\n                                教育 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "YY Inc",
          "money": "10k-15k",
          "site": "番禺区",
          "time": "2017-03-22",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "沐思信息",
          "money": "10k-20k",
          "site": "棠下",
          "time": "2017-03-29",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "一票国际",
          "money": "10k-20k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "中国电信IT研发中心",
          "money": "20k-35k",
          "site": "石牌",
          "time": "2017-03-23",
          "industry": "\n                                其他 / 上市公司\n                            "
        },
        {
          "company": "唯彩会",
          "money": "8k-10k",
          "site": "广州",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "天高科技",
          "money": "6k-10k",
          "site": "海珠区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "yuhui",
          "money": "8k-13k",
          "site": "龙口",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "奔步",
          "money": "15k-25k",
          "site": "石牌",
          "time": "2017-03-15",
          "industry": "\n                                移动互联网,电子商务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广东洪睿科技",
          "money": "6k-8k",
          "site": "广州",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "翠花APP平台",
          "money": "10k-20k",
          "site": "荔湾区",
          "time": "2017-03-24",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "珠海易达假期",
          "money": "10k-20k",
          "site": "解放北",
          "time": "1天前发布",
          "industry": "\n                                旅游,广告营销 / 初创型(未融资)\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "16k-22k",
          "site": "员村",
          "time": "2017-03-27",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "YY Inc",
          "money": "15k-20k",
          "site": "番禺区",
          "time": "2017-03-22",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "商沃集团",
          "money": "6k-8k",
          "site": "天河区",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,电子商务 / 成长型(A轮)\n                            "
        },
        {
          "company": "IBOS",
          "money": "10k-15k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,企业服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "广州丰盛健康管理有限公司",
          "money": "13k-17k",
          "site": "岭南",
          "time": "2017-03-08",
          "industry": "\n                                O2O,医疗健康 / 上市公司\n                            "
        },
        {
          "company": "广州我在网络科技有限公司",
          "money": "8k-12k",
          "site": "海珠区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州麒云萱韬信息科技有限公司",
          "money": "10k-20k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,企业服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "一票科技",
          "money": "10k-20k",
          "site": "林和",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,文化娱乐 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "恒峰信息",
          "money": "8k-12k",
          "site": "天园",
          "time": "1天前发布",
          "industry": "\n                                移动互联网,硬件 / 上市公司\n                            "
        },
        {
          "company": "明动软件",
          "money": "7k-12k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                企业服务,数据服务 / 上市公司\n                            "
        },
        {
          "company": "3N技术合伙人",
          "money": "8k-15k",
          "site": "跑马场",
          "time": "2天前发布",
          "industry": "\n                                电子商务,社交网络 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州犁牛网络科技有限公司",
          "money": "10k-15k",
          "site": "天河北",
          "time": "2天前发布",
          "industry": "\n                                电子商务,移动互联网 / 上市公司\n                            "
        },
        {
          "company": "唯品会",
          "money": "20k-35k",
          "site": "荔湾区",
          "time": "2天前发布",
          "industry": "\n                                电子商务 / 上市公司\n                            "
        },
        {
          "company": "大圣科技",
          "money": "10k-20k",
          "site": "芳村",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,O2O / 成长型(不需要融资)\n                            "
        },
        {
          "company": "万秀网",
          "money": "8k-13k",
          "site": "客村",
          "time": "2017-04-11",
          "industry": "\n                                电子商务,旅游 / 成长型(A轮)\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "6k-8k",
          "site": "员村",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "商沃集团",
          "money": "7k-9k",
          "site": "天河区",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,电子商务 / 成长型(A轮)\n                            "
        },
        {
          "company": "岸腾信息科技",
          "money": "8k-16k",
          "site": "南华西",
          "time": "2017-04-04",
          "industry": "\n                                移动互联网,游戏 / 初创型(天使轮)\n                            "
        },
        {
          "company": "玄武科技",
          "money": "12k-18k",
          "site": "天河城",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,招聘 / 上市公司\n                            "
        },
        {
          "company": "广州丰盛健康管理有限公司",
          "money": "20k-30k",
          "site": "海珠区",
          "time": "2017-03-08",
          "industry": "\n                                O2O,医疗健康 / 上市公司\n                            "
        },
        {
          "company": "海豚科技",
          "money": "10k-13k",
          "site": "元岗",
          "time": "2天前发布",
          "industry": "\n                                O2O,金融 / 成长型(A轮)\n                            "
        },
        {
          "company": "广州棒谷网络科技有限公司",
          "money": "10k-20k",
          "site": "白云大道",
          "time": "3天前发布",
          "industry": "\n                                电子商务 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "真功夫",
          "money": "8k-10k",
          "site": "天河城",
          "time": "21:36发布",
          "industry": "\n                                生活服务 / 成熟型(C轮)\n                            "
        },
        {
          "company": "天行客",
          "money": "8k-13k",
          "site": "车陂",
          "time": "3天前发布",
          "industry": "\n                                游戏 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "上海·订么微信智慧餐厅",
          "money": "6k-8k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "网金控股",
          "money": "15k-30k",
          "site": "珠江新城",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "趣运动",
          "money": "8k-15k",
          "site": "员村",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网 ,O2O / 成熟型(C轮)\n                            "
        },
        {
          "company": "三合通信",
          "money": "8k-12k",
          "site": "越秀区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,广告营销 / 初创型(未融资)\n                            "
        },
        {
          "company": "哥里科技",
          "money": "9k-15k",
          "site": "岭南",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "广州市宜佰搭服装有限公司",
          "money": "10k-15k",
          "site": "白云区",
          "time": "2017-03-24",
          "industry": "\n                                企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "20k-35k",
          "site": "员村",
          "time": "2017-03-17",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "邦卓",
          "money": "13k-18k",
          "site": "萝岗区",
          "time": "2天前发布",
          "industry": "\n                                企业服务,招聘 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "有宠集团",
          "money": "6k-8k",
          "site": "萝岗区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,社交网络 / 成长型(A轮)\n                            "
        },
        {
          "company": "苍鸟公司",
          "money": "8k-12k",
          "site": "萝岗区",
          "time": "1天前发布",
          "industry": "\n                                移动互联网、电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "鑫亚物流",
          "money": "8k-12k",
          "site": "白云区",
          "time": "2017-04-06",
          "industry": "\n                                生活服务,电子商务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "要出发",
          "money": "8k-15k",
          "site": "天园",
          "time": "2天前发布",
          "industry": "\n                                电子商务,生活服务 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "爸爸我要",
          "money": "10k-15k",
          "site": "大石",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "恒拓开源总公司",
          "money": "12k-18k",
          "site": "五山",
          "time": "3天前发布",
          "industry": "\n                                企业服务,信息安全 / 上市公司\n                            "
        },
        {
          "company": "唯厘科技",
          "money": "6k-12k",
          "site": "琶洲",
          "time": "2017-04-08",
          "industry": "\n                                移动互联网,企业服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "智悅网络",
          "money": "10k-20k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 成长型(A轮)\n                            "
        },
        {
          "company": "鹰眼数据",
          "money": "11k-20k",
          "site": "天河区",
          "time": "2017-04-12",
          "industry": "\n                                数据服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州市圣湘琳信息科技有限公司",
          "money": "8k-16k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "南方数码",
          "money": "8k-13k",
          "site": "天园",
          "time": "3天前发布",
          "industry": "\n                                数据服务,企业服务 / 上市公司\n                            "
        },
        {
          "company": "新清铧",
          "money": "10k-15k",
          "site": "滨江",
          "time": "2017-03-24",
          "industry": "\n                                医疗健康,数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "亚酷",
          "money": "5k-8k",
          "site": "黄村",
          "time": "10:57发布",
          "industry": "\n                                移动互联网,电子商务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "网农信息",
          "money": "7k-10k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                电子商务,移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "凡科",
          "money": "8k-15k",
          "site": "工业大道",
          "time": "1天前发布",
          "industry": "\n                                企业服务 / 上市公司\n                            "
        },
        {
          "company": "爱海购全球购",
          "money": "8k-10k",
          "site": "广州",
          "time": "2天前发布",
          "industry": "\n                                电子商务,移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "迪奥科技",
          "money": "8k-15k",
          "site": "天河区",
          "time": "2017-04-09",
          "industry": "\n                                O2O,数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "广州中软",
          "money": "6k-10k",
          "site": "广州",
          "time": "2天前发布",
          "industry": "\n                                数据服务,硬件 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "多益网络",
          "money": "5k-10k",
          "site": "萝岗区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "亚太花卉",
          "money": "8k-15k",
          "site": "荔湾区",
          "time": "2017-04-07",
          "industry": "\n                                电子商务 / 成长型(A轮)\n                            "
        },
        {
          "company": "钱鹿",
          "money": "2k-4k",
          "site": "广州",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "德利",
          "money": "12k-20k",
          "site": "沙园",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 成长型(A轮)\n                            "
        },
        {
          "company": "CUBESEC",
          "money": "6k-8k",
          "site": "越秀区",
          "time": "3天前发布",
          "industry": "\n                                信息安全 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "搜狐焦点",
          "money": "10k-15k",
          "site": "天河区",
          "time": "2017-04-06",
          "industry": "\n                                生活服务 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "广州安必平",
          "money": "10k-18k",
          "site": "萝岗区",
          "time": "2017-03-15",
          "industry": "\n                                其他 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广州酷游",
          "money": "6k-8k",
          "site": "天园",
          "time": "2天前发布",
          "industry": "\n                                游戏 / 初创型(天使轮)\n                            "
        },
        {
          "company": "皓轩科技",
          "money": "8k-14k",
          "site": "天河公园",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "零壹金服",
          "money": "8k-12k",
          "site": "跑马场",
          "time": "2017-04-12",
          "industry": "\n                                金融,移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "浪潮数字媒体",
          "money": "8k-12k",
          "site": "新港",
          "time": "2017-03-30",
          "industry": "\n                                移动互联网,文化娱乐 / 上市公司\n                            "
        },
        {
          "company": "美捷软件",
          "money": "8k-12k",
          "site": "清河东路",
          "time": "2017-03-31",
          "industry": "\n                                企业服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "易达科技",
          "money": "8k-10k",
          "site": "石牌",
          "time": "2天前发布",
          "industry": "\n                                企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "叮叮医生",
          "money": "7k-14k",
          "site": "赤岗",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "明动软件",
          "money": "5k-10k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                企业服务,数据服务 / 上市公司\n                            "
        },
        {
          "company": "幽蓝科技",
          "money": "10k-15k",
          "site": "天河公园",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "IBOS",
          "money": "4k-8k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,企业服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "坤盛科技",
          "money": "10K-15K",
          "site": "石牌",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "爱拍原创",
          "money": "6k-12k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                文化娱乐 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "赞同科技",
          "money": "5k-10k",
          "site": "黄花岗",
          "time": "2天前发布",
          "industry": "\n                                企业服务,金融 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "互动大师iH5.cn",
          "money": "10k-15k",
          "site": "越秀区",
          "time": "3天前发布",
          "industry": "\n                                数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "大医康众",
          "money": "10k-20k",
          "site": "天河区",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,医疗健康 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州日报报业集团",
          "money": "6k-10k",
          "site": "岭南",
          "time": "2017-04-05",
          "industry": "\n                                文化娱乐 / 上市公司\n                            "
        },
        {
          "company": "白马",
          "money": "10k-12k",
          "site": "新港",
          "time": "2017-03-10",
          "industry": "\n                                移动互联网,电子商务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "健康猫",
          "money": "7k-11k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "虎笑",
          "money": "15k-25k",
          "site": "琶洲",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "粤科软件",
          "money": "13k-23k",
          "site": "广州",
          "time": "2017-04-10",
          "industry": "\n                                电子商务,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "YY Inc",
          "money": "10k-12k",
          "site": "番禺区",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "夜乐科技",
          "money": "8k-16k",
          "site": "元岗",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "广东移领科技有限公司",
          "money": "12k-18k",
          "site": "荔湾区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,O2O / 初创型(天使轮)\n                            "
        },
        {
          "company": "地道Daydow",
          "money": "8k-12k",
          "site": "大东",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,旅游 / 成长型(A轮)\n                            "
        },
        {
          "company": "网易游戏",
          "money": "13k-26k",
          "site": "冼村",
          "time": "15:08发布",
          "industry": "\n                                游戏 / 上市公司\n                            "
        },
        {
          "company": "曦和",
          "money": "6k-10k",
          "site": "跑马场",
          "time": "2017-03-20",
          "industry": "\n                                企业服务,金融 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "维普氏",
          "money": "6k-8k",
          "site": "广州",
          "time": "2017-03-14",
          "industry": "\n                                移动互联网,企业服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "云适配",
          "money": "8K-15K",
          "site": "沙河",
          "time": "2017-03-14",
          "industry": "\n                                移动互联网 / 成长型(B轮)\n                            "
        },
        {
          "company": "酷狗音乐",
          "money": "8k-15k",
          "site": "车陂",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,文化娱乐 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "车笨笨-你爱车的私人管家",
          "money": "6K-12K",
          "site": "南村",
          "time": "2017-04-08",
          "industry": "\n                                移动互联网,生活服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "广州返了么网络科技有限公司",
          "money": "8k-16k",
          "site": "珠江新城",
          "time": "2017-04-07",
          "industry": "\n                                电子商务,O2O / 上市公司\n                            "
        },
        {
          "company": "试试",
          "money": "8k-15k",
          "site": "体育中心",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,O2O / 初创型(天使轮)\n                            "
        },
        {
          "company": "乌扑",
          "money": "8K-13K",
          "site": "体育中心",
          "time": "2017-03-30",
          "industry": "\n                                企业服务,移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "幸云至商",
          "money": "8k-9k",
          "site": "岭南",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "欢拓网络",
          "money": "5k-10k",
          "site": "天园",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,教育 / 成长型(A轮)\n                            "
        },
        {
          "company": "掌中乐游",
          "money": "10k-12k",
          "site": "五山",
          "time": "2017-03-24",
          "industry": "\n                                游戏 / 初创型(未融资)\n                            "
        },
        {
          "company": "彩讯科技",
          "money": "7k-11k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,生活服务 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "因孚",
          "money": "10k-13k",
          "site": "龙口",
          "time": "2017-03-08",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "欧浦智网",
          "money": "8k-15k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,电子商务 / 上市公司\n                            "
        },
        {
          "company": "诸葛理财",
          "money": "8k-15k",
          "site": "广州",
          "time": "2017-03-31",
          "industry": "\n                                金融 / 成长型(A轮)\n                            "
        },
        {
          "company": "广发证券",
          "money": "25k-35k",
          "site": "跑马场",
          "time": "2017-03-28",
          "industry": "\n                                金融 / 上市公司\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "10k-15k",
          "site": "员村",
          "time": "2017-03-27",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "骑鹅旅行",
          "money": "10k-20k",
          "site": "琶洲",
          "time": "3天前发布",
          "industry": "\n                                旅游,数据服务 / 成长型(B轮)\n                            "
        },
        {
          "company": "东方国信",
          "money": "7k-12k",
          "site": "天河区",
          "time": "2017-03-29",
          "industry": "\n                                数据服务 / 上市公司\n                            "
        },
        {
          "company": "金山WPS",
          "money": "15k-30k",
          "site": "棠下",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "责卓医药咨询",
          "money": "10k-15k",
          "site": "广州",
          "time": "2017-03-29",
          "industry": "\n                                移动互联网,数据服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "益盛鑫网络科技",
          "money": "8k-13k",
          "site": "员村",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网,金融 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "启舟科技",
          "money": "4k-8k",
          "site": "天河区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,电子商务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "大白互联",
          "money": "4k-6k",
          "site": "南沙区",
          "time": "1天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "方里格信息科技",
          "money": "8k-16k",
          "site": "新港",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,教育 / 初创型(未融资)\n                            "
        },
        {
          "company": "LD",
          "money": "10k-15k",
          "site": "龙洞",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "悠派智能",
          "money": "6k-10k",
          "site": "琶洲",
          "time": "2017-03-21",
          "industry": "\n                                O2O / 初创型(未融资)\n                            "
        },
        {
          "company": "寰宇观邑",
          "money": "6k-8k",
          "site": "员村",
          "time": "2017-03-17",
          "industry": "\n                                移动互联网,广告营销 / 初创型(未融资)\n                            "
        },
        {
          "company": "勤思科技",
          "money": "6k-12k",
          "site": "番禺区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "广东数果科技有限公司",
          "money": "15k-30k",
          "site": "广州",
          "time": "2017-03-31",
          "industry": "\n                                数据服务,信息安全 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州人资选",
          "money": "9k-15k",
          "site": "沙河",
          "time": "2017-04-07",
          "industry": "\n                                移动互联网,电子商务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "腾鼎科技",
          "money": "5k-8k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                游戏 / 初创型(未融资)\n                            "
        },
        {
          "company": "Raxtta 智能硬件",
          "money": "6k-9k",
          "site": "大学城",
          "time": "2017-04-06",
          "industry": "\n                                硬件,电子商务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "贪玩游戏",
          "money": "13k-25k",
          "site": "员村",
          "time": "3天前发布",
          "industry": "\n                                游戏 / 成长型(A轮)\n                            "
        },
        {
          "company": "民贷天下",
          "money": "15k-22k",
          "site": "东风东",
          "time": "2017-04-12",
          "industry": "\n                                金融 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "达仁科技",
          "money": "5k-8k",
          "site": "天河区",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,企业服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "畅游瑞科广州分公司",
          "money": "10k-15k",
          "site": "天园",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,游戏 / 上市公司\n                            "
        },
        {
          "company": "科南软件",
          "money": "15k-20k",
          "site": "黄花岗",
          "time": "2017-03-20",
          "industry": "\n                                移动互联网,数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "省广股份",
          "money": "8k-15k",
          "site": "越秀区",
          "time": "2017-04-05",
          "industry": "\n                                广告营销 / 上市公司\n                            "
        },
        {
          "company": "南方仕通",
          "money": "10k-15k",
          "site": "猎德",
          "time": "2017-03-23",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "嘿运动",
          "money": "10k-15k",
          "site": "棠景",
          "time": "2017-04-12",
          "industry": "\n                                电子商务,移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "趣呗科技",
          "money": "8K-15K",
          "site": "五山",
          "time": "2017-03-28",
          "industry": "\n                                移动互联网,游戏 / 初创型(天使轮)\n                            "
        },
        {
          "company": "知一科技",
          "money": "6k-10k",
          "site": "番禺区",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,社交网络 / 初创型(天使轮)\n                            "
        },
        {
          "company": "恒大珠三角公司",
          "money": "25k-50k",
          "site": "珠江新城",
          "time": "2017-03-29",
          "industry": "\n                                移动互联网,生活服务 / 上市公司\n                            "
        },
        {
          "company": "健康猫",
          "money": "12k-15k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "奇遇旅行",
          "money": "5k-7k",
          "site": "白鹅潭",
          "time": "3天前发布",
          "industry": "\n                                O2O,旅游 / 初创型(天使轮)\n                            "
        },
        {
          "company": "林盟科技",
          "money": "6k-10k",
          "site": "元岗",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,企业服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "易的软件",
          "money": "10k-20k",
          "site": "萝岗区",
          "time": "2017-04-10",
          "industry": "\n                                其他,数据服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "博胜科技",
          "money": "8k-15k",
          "site": "客村",
          "time": "2017-04-06",
          "industry": "\n                                移动互联网,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "HQICE",
          "money": "6k-12k",
          "site": "石牌",
          "time": "2017-04-05",
          "industry": "\n                                电子商务,金融 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广东好胎屋",
          "money": "10k-16k",
          "site": "江南大道",
          "time": "2017-03-16",
          "industry": "\n                                O2O / 成长型(A轮)\n                            "
        },
        {
          "company": "领略网络",
          "money": "6k-9k",
          "site": "岭南",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "法宝网",
          "money": "15k-25k",
          "site": "天河北",
          "time": "2017-03-08",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "凡科",
          "money": "7k-9k",
          "site": "工业大道",
          "time": "1天前发布",
          "industry": "\n                                企业服务 / 上市公司\n                            "
        },
        {
          "company": "课外喵",
          "money": "6k-9k",
          "site": "天园",
          "time": "3天前发布",
          "industry": "\n                                O2O,教育 / 成长型(B轮)\n                            "
        },
        {
          "company": "网易游戏",
          "money": "10k-20k",
          "site": "天园",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "庭燎科技",
          "money": "5k-6k",
          "site": "岑村",
          "time": "2017-03-09",
          "industry": "\n                                电子商务,O2O / 初创型(天使轮)\n                            "
        },
        {
          "company": "悦餐科技",
          "money": "6k-10k",
          "site": "元岗",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "花云网络",
          "money": "9k-16k",
          "site": "珠江新城",
          "time": "10:29发布",
          "industry": "\n                                移动互联网,电子商务 / 成长型(A轮)\n                            "
        },
        {
          "company": "唯品会",
          "money": "15k-25k",
          "site": "白鹅潭",
          "time": "2017-04-12",
          "industry": "\n                                电子商务 / 上市公司\n                            "
        },
        {
          "company": "晓安网络科技有限公司",
          "money": "6K-12K",
          "site": "琶洲",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网、企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "高乐教育",
          "money": "8K-13K",
          "site": "天河区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "城北技术",
          "money": "4k-8k",
          "site": "中大",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "米玩互娱",
          "money": "8k-16k",
          "site": "员村",
          "time": "2017-03-28",
          "industry": "\n                                游戏 / 初创型(未融资)\n                            "
        },
        {
          "company": "医博网",
          "money": "8k-12k",
          "site": "大东",
          "time": "2017-04-11",
          "industry": "\n                                医疗健康,数据服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "广州远思泽智广告有限公司",
          "money": "10k-20k",
          "site": "赤岗",
          "time": "2017-04-02",
          "industry": "\n                                广告营销,文化娱乐 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "零售易",
          "money": "6K-12K",
          "site": "石牌",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,企业服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "一智通",
          "money": "8k-15k",
          "site": "沙东",
          "time": "2017-03-09",
          "industry": "\n                                企业服务 / 成长型(B轮)\n                            "
        },
        {
          "company": "古藤动漫",
          "money": "13k-26k",
          "site": "元岗",
          "time": "1天前发布",
          "industry": "\n                                游戏 / 初创型(未融资)\n                            "
        },
        {
          "company": "奥飞娱乐股份有限公司",
          "money": "8k-10k",
          "site": "天河区",
          "time": "2017-03-14",
          "industry": "\n                                文化娱乐 / 上市公司\n                            "
        },
        {
          "company": "广东联结",
          "money": "8k-15k",
          "site": "琶洲",
          "time": "2017-03-28",
          "industry": "\n                                移动互联网,O2O / 成长型(不需要融资)\n                            "
        },
        {
          "company": "云能",
          "money": "6k-12k",
          "site": "环市东",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网,医疗健康 / 初创型(未融资)\n                            "
        },
        {
          "company": "对等网",
          "money": "6k-12k",
          "site": "建设",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,社交网络 / 初创型(未融资)\n                            "
        },
        {
          "company": "爱讯集团",
          "money": "3k-5k",
          "site": "石牌",
          "time": "2017-04-11",
          "industry": "\n                                数据服务,移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "寓米网",
          "money": "10k-13k",
          "site": "天河北",
          "time": "2017-04-05",
          "industry": "\n                                生活服务,电子商务 / 上市公司\n                            "
        },
        {
          "company": "印美图",
          "money": "10k-15k",
          "site": "天河公园",
          "time": "2017-03-28",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "加减信息",
          "money": "10k-15k",
          "site": "车陂",
          "time": "14:58发布",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "汇桔网",
          "money": "8k-16k",
          "site": "萝岗区",
          "time": "2天前发布",
          "industry": "\n                                企业服务,O2O / 成熟型(C轮)\n                            "
        },
        {
          "company": "幽蓝科技",
          "money": "15k-20k",
          "site": "天河公园",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "纽诺育儿学院",
          "money": "8k-15k",
          "site": "体育中心",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网,教育 / 成长型(A轮)\n                            "
        },
        {
          "company": "广州策码",
          "money": "6k-8k",
          "site": "番禺区",
          "time": "2017-04-07",
          "industry": "\n                                数据服务,移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "名创优品",
          "money": "3k-6k",
          "site": "天河区",
          "time": "2017-04-09",
          "industry": "\n                                生活服务,其他 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "叮叮医生",
          "money": "2k-4k",
          "site": "赤岗",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州东通网络科技有限公司",
          "money": "6k-12k",
          "site": "棠下",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,O2O / 初创型(天使轮)\n                            "
        },
        {
          "company": "全思科技",
          "money": "4k-7k",
          "site": "客村",
          "time": "2017-04-08",
          "industry": "\n                                教育,生活服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州优识",
          "money": "6k-10k",
          "site": "跑马场",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "名医传世",
          "money": "10k-18k",
          "site": "岑村",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 成长型(B轮)\n                            "
        },
        {
          "company": "辅阅通",
          "money": "8k-16k",
          "site": "海珠区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,教育 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "Signalfire",
          "money": "4k-7k",
          "site": "东风东",
          "time": "2天前发布",
          "industry": "\n                                数据服务,移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "广付科技",
          "money": "5k-10k",
          "site": "黄石",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,O2O / 成长型(不需要融资)\n                            "
        },
        {
          "company": "小哈科技",
          "money": "6k-9k",
          "site": "车陂",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "修炼",
          "money": "10k-20k",
          "site": "石牌",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "健康猫",
          "money": "15k-20k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "凯信壹立",
          "money": "8k-15k",
          "site": "沙河",
          "time": "3天前发布",
          "industry": "\n                                电子商务,企业服务 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "广东睿盟科技",
          "money": "5k-10k",
          "site": "车陂",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,其他 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "口袋兼职",
          "money": "7k-9k",
          "site": "车陂",
          "time": "2017-04-07",
          "industry": "\n                                移动互联网,招聘 / 成长型(A轮)\n                            "
        },
        {
          "company": "罗宾医生",
          "money": "10k-15k",
          "site": "海珠区",
          "time": "2天前发布",
          "industry": "\n                                医疗健康 / 成长型(A轮)\n                            "
        },
        {
          "company": "爱美网",
          "money": "6k-8k",
          "site": "五山",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "南都",
          "money": "6k-12k",
          "site": "五羊新城",
          "time": "2017-04-12",
          "industry": "\n                                文化娱乐 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "PAIR留学/鲸鱼高校",
          "money": "6k-12k",
          "site": "林和",
          "time": "2017-04-10",
          "industry": "\n                                教育 / 初创型(天使轮)\n                            "
        },
        {
          "company": "快批KP",
          "money": "12k-24k",
          "site": "琶洲",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "科大讯飞",
          "money": "8k-12k",
          "site": "萝岗区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,数据服务 / 上市公司\n                            "
        },
        {
          "company": "机智云",
          "money": "5k-10k",
          "site": "兴华",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,硬件 / 成长型(B轮)\n                            "
        },
        {
          "company": "要出发",
          "money": "8k-15k",
          "site": "天园",
          "time": "2天前发布",
          "industry": "\n                                电子商务,生活服务 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "码码高",
          "money": "8k-15k",
          "site": "长兴",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,电子商务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "柏涛",
          "money": "9k-18k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "广州华大鑫盛网络科技有限公司",
          "money": "8k-12k",
          "site": "珠江新城",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "创河软件",
          "money": "6k-10k",
          "site": "棠下",
          "time": "2017-03-28",
          "industry": "\n                                移动互联网,企业服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "研游",
          "money": "4k-6k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                游戏 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "毒舌电影",
          "money": "6k-12k",
          "site": "沙河",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,文化娱乐 / 成长型(A轮)\n                            "
        },
        {
          "company": "南航信息中心",
          "money": "8k-15k",
          "site": "花都区",
          "time": "2017-03-28",
          "industry": "\n                                移动互联网,企业服务 / 上市公司\n                            "
        },
        {
          "company": "考拉先生",
          "money": "10k-15k",
          "site": "沙东",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成长型(B轮)\n                            "
        },
        {
          "company": "推乐",
          "money": "2k-4k",
          "site": "大学城",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,O2O / 初创型(天使轮)\n                            "
        },
        {
          "company": "上策科技",
          "money": "8k-10k",
          "site": "白云大道",
          "time": "2017-03-30",
          "industry": "\n                                医疗健康 / 初创型(天使轮)\n                            "
        },
        {
          "company": "群智网络",
          "money": "5K-10K",
          "site": "沙河",
          "time": "2017-04-06",
          "industry": "\n                                移动互联网,O2O / 初创型(未融资)\n                            "
        },
        {
          "company": "Network Grand",
          "money": "8k以上",
          "site": "员村",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "维普氏",
          "money": "6k-8k",
          "site": "东环",
          "time": "2017-03-14",
          "industry": "\n                                移动互联网,企业服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "荔枝FM",
          "money": "10k-20k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 成熟型(C轮)\n                            "
        },
        {
          "company": "广东源恒",
          "money": "15k-30k",
          "site": "跑马场",
          "time": "2017-04-10",
          "industry": "\n                                企业服务,数据服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "艾佩克",
          "money": "5k-8k",
          "site": "南村",
          "time": "2017-03-15",
          "industry": "\n                                企业服务,其他 / 初创型(未融资)\n                            "
        },
        {
          "company": "SPONIA",
          "money": "10k-16k",
          "site": "五山",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,文化娱乐 / 初创型(天使轮)\n                            "
        },
        {
          "company": "尚为软件",
          "money": "8k-15k",
          "site": "赤岗",
          "time": "2017-03-23",
          "industry": "\n                                移动互联网,金融 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "爱拍原创",
          "money": "6k-12k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                文化娱乐 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "南方新媒体",
          "money": "8k-15k",
          "site": "流花",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,文化娱乐 / 成长型(A轮)\n                            "
        },
        {
          "company": "壹度",
          "money": "5k-8k",
          "site": "番禺区",
          "time": "2017-03-19",
          "industry": "\n                                移动互联网,文化娱乐 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "小九",
          "money": "7k-14k",
          "site": "人和",
          "time": "2017-04-12",
          "industry": "\n                                其他 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "柠聚科技",
          "money": "5k-8k",
          "site": "棠下",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "腾讯",
          "money": "20k-40k",
          "site": "海珠区",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网 ,游戏 / 上市公司\n                            "
        },
        {
          "company": "水禾田科技公司",
          "money": "4k-7k",
          "site": "嘉禾",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "汇桔网",
          "money": "15k-20k",
          "site": "萝岗区",
          "time": "2天前发布",
          "industry": "\n                                企业服务,O2O / 成熟型(C轮)\n                            "
        },
        {
          "company": "全民快乐",
          "money": "8k-16k",
          "site": "天园",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,社交网络 / 成长型(B轮)\n                            "
        },
        {
          "company": "龙席网络",
          "money": "6k-12k",
          "site": "天河区",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,电子商务 / 上市公司\n                            "
        },
        {
          "company": "翼课网",
          "money": "8k-15k",
          "site": "番禺区",
          "time": "2017-03-20",
          "industry": "\n                                移动互联网 ,教育 / 成长型(B轮)\n                            "
        },
        {
          "company": "申迪计算机",
          "money": "6k-10k",
          "site": "梅花村",
          "time": "2017-04-12",
          "industry": "\n                                企业服务,信息安全 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "诸葛理财",
          "money": "13k-25k",
          "site": "棠下",
          "time": "2017-03-31",
          "industry": "\n                                金融 / 成长型(A轮)\n                            "
        },
        {
          "company": "佰锐科技",
          "money": "6k-10k",
          "site": "天园",
          "time": "1天前发布",
          "industry": "\n                                移动互联网,数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "博彦科技",
          "money": "8k-11k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                企业服务,数据服务 / 上市公司\n                            "
        },
        {
          "company": "原昇",
          "money": "4k-8k",
          "site": "棠下",
          "time": "2017-04-06",
          "industry": "\n                                移动互联网,数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "辰硕互联",
          "money": "8k-14k",
          "site": "石牌",
          "time": "2017-04-06",
          "industry": "\n                                移动互联网,数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "光启信息科技",
          "money": "4k-7k",
          "site": "棠下",
          "time": "2017-04-01",
          "industry": "\n                                移动互联网,企业服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "得豆科技",
          "money": "2k-4k",
          "site": "永平",
          "time": "2017-03-30",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "大洋信息",
          "money": "10k-15k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 上市公司\n                            "
        },
        {
          "company": "哈图",
          "money": "4k-7k",
          "site": "南沙区",
          "time": "3天前发布",
          "industry": "\n                                企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "大速据",
          "money": "10k-20k",
          "site": "广州",
          "time": "2017-04-10",
          "industry": "\n                                电子商务,移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "首指科技",
          "money": "8K-16K",
          "site": "从化市",
          "time": "1天前发布",
          "industry": "\n                                电子商务、移动互联网 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "广州中为",
          "money": "8k-15k",
          "site": "市桥",
          "time": "2天前发布",
          "industry": "\n                                电子商务,其他 / 初创型(天使轮)\n                            "
        },
        {
          "company": "无美科技",
          "money": "5k-6k",
          "site": "天河区",
          "time": "2017-03-29",
          "industry": "\n                                移动互联网 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "飞进科技",
          "money": "3k-6k",
          "site": "员村",
          "time": "2017-03-20",
          "industry": "\n                                移动互联网,信息安全 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "人马科技",
          "money": "6k-12k",
          "site": "车陂",
          "time": "2017-03-16",
          "industry": "\n                                移动互联网,电子商务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "广东智源",
          "money": "2k-4k",
          "site": "登峰",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "亿阳信通",
          "money": "8k-15k",
          "site": "环市东",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,数据服务 / 上市公司\n                            "
        },
        {
          "company": "广东优德科技",
          "money": "6k以上",
          "site": "珠江新城",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "云徙科技",
          "money": "25k-50k",
          "site": "鱼珠",
          "time": "2017-03-21",
          "industry": "\n                                数据服务,移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州智选网络科技有限公司",
          "money": "15k-20k",
          "site": "天河区",
          "time": "1天前发布",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "掏掏汽配科技（APTOTO）",
          "money": "8k-13k",
          "site": "天河区",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网,其他 / 成长型(A轮)\n                            "
        },
        {
          "company": "有车以后",
          "money": "8k-16k",
          "site": "新港",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网 / 成熟型(C轮)\n                            "
        },
        {
          "company": "广电银通",
          "money": "8k-10k",
          "site": "天河区",
          "time": "2017-03-20",
          "industry": "\n                                金融,硬件 / 上市公司\n                            "
        },
        {
          "company": "金羊网",
          "money": "7k-9k",
          "site": "棠下",
          "time": "2017-03-13",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "Network Grand",
          "money": "10k-15k",
          "site": "员村",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "衡必康",
          "money": "4k-8k",
          "site": "大学城",
          "time": "2017-03-08",
          "industry": "\n                                医疗健康,移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "一修信息科技",
          "money": "6k-10k",
          "site": "车陂",
          "time": "2017-03-16",
          "industry": "\n                                游戏,移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "广州尚学堂",
          "money": "15k-30k",
          "site": "元岗",
          "time": "2017-04-06",
          "industry": "\n                                教育,移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "光大分利宝",
          "money": "12k-20k",
          "site": "广州",
          "time": "2天前发布",
          "industry": "\n                                金融,移动互联网 / 成熟型(C轮)\n                            "
        },
        {
          "company": "卡姿兰",
          "money": "5k-10k",
          "site": "珠江新城",
          "time": "3天前发布",
          "industry": "\n                                电子商务 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "云知光",
          "money": "10k-17k",
          "site": "钟村",
          "time": "2017-03-28",
          "industry": "\n                                移动互联网,分类信息 / 初创型(未融资)\n                            "
        },
        {
          "company": "YY Inc",
          "money": "10k-14k",
          "site": "番禺区",
          "time": "2017-03-23",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "1号货的",
          "money": "12k-20k",
          "site": "车陂",
          "time": "1天前发布",
          "industry": "\n                                移动互联网,O2O / 成长型(B轮)\n                            "
        },
        {
          "company": "招聘程序员",
          "money": "6k-12k",
          "site": "芳村",
          "time": "2017-04-05",
          "industry": "\n                                电子商务,医疗健康 / 初创型(未融资)\n                            "
        },
        {
          "company": "广州市大枣信息科技有限公司",
          "money": "8k-16k",
          "site": "南沙区",
          "time": "2017-03-25",
          "industry": "\n                                硬件 / 初创型(未融资)\n                            "
        },
        {
          "company": "Forgame",
          "money": "6k-9k",
          "site": "天河区",
          "time": "2017-04-12",
          "industry": "\n                                游戏 / 上市公司\n                            "
        },
        {
          "company": "瑞立德",
          "money": "10k-20k",
          "site": "天河区",
          "time": "2017-03-30",
          "industry": "\n                                生活服务,数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "云徙科技",
          "money": "15k-30k",
          "site": "鱼珠",
          "time": "2017-03-21",
          "industry": "\n                                数据服务,移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州酷游",
          "money": "6k-8k",
          "site": "天园",
          "time": "2天前发布",
          "industry": "\n                                游戏 / 初创型(天使轮)\n                            "
        },
        {
          "company": "壹豆",
          "money": "10k-13k",
          "site": "珠江新城",
          "time": "2017-03-28",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "恒腾网络",
          "money": "20k-30k",
          "site": "珠江新城",
          "time": "2017-03-14",
          "industry": "\n                                O2O,移动互联网 / 上市公司\n                            "
        },
        {
          "company": "甲子智能",
          "money": "8k-10k",
          "site": "广州",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,硬件 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "正勤金融",
          "money": "7k-12k",
          "site": "天河北",
          "time": "2017-03-28",
          "industry": "\n                                电子商务,金融 / 初创型(未融资)\n                            "
        },
        {
          "company": "NewsJet",
          "money": "10k-15k",
          "site": "石牌",
          "time": "2017-03-13",
          "industry": "\n                                移动互联网,广告营销 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州碧软",
          "money": "8k-14k",
          "site": "石牌",
          "time": "2017-04-06",
          "industry": "\n                                企业服务,金融 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "惠吃猫",
          "money": "20k-30k",
          "site": "琶洲",
          "time": "2017-03-29",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "社群科技",
          "money": "6k-12k",
          "site": "番禺区",
          "time": "2017-04-12",
          "industry": "\n                                电子商务,移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "百高",
          "money": "2k-4k",
          "site": "水荫",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,电子商务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "广州邮政",
          "money": "8k-13k",
          "site": "石牌",
          "time": "2017-03-27",
          "industry": "\n                                移动互联网,电子商务 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "鲜檬摄影",
          "money": "5k-10k",
          "site": "石牌",
          "time": "2017-03-09",
          "industry": "\n                                O2O,移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "英威斯特",
          "money": "10k-20k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,金融 / 初创型(未融资)\n                            "
        },
        {
          "company": "两棵树",
          "money": "10k-17k",
          "site": "棠下",
          "time": "3天前发布",
          "industry": "\n                                电子商务 / 成长型(A轮)\n                            "
        },
        {
          "company": "普金计算机",
          "money": "6k-10k",
          "site": "员村",
          "time": "2天前发布",
          "industry": "\n                                电子商务,金融 / 上市公司\n                            "
        },
        {
          "company": "广东道一",
          "money": "8k-15k",
          "site": "天河公园",
          "time": "2017-03-31",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "千旸科技",
          "money": "3k-6k",
          "site": "番禺区",
          "time": "2017-04-11",
          "industry": "\n                                硬件,移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广东洪睿科技",
          "money": "2k-3k",
          "site": "沙东",
          "time": "2017-04-04",
          "industry": "\n                                移动互联网,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "贝法易 - 跨境电商领先者",
          "money": "10k-20k",
          "site": "跑马场",
          "time": "2017-03-24",
          "industry": "\n                                电子商务,招聘 / 成长型(B轮)\n                            "
        },
        {
          "company": "文思海辉",
          "money": "8k-16k",
          "site": "天河区",
          "time": "2017-03-23",
          "industry": "\n                                金融、数据服务 / 上市公司\n                            "
        },
        {
          "company": "广州数园网络有限公司",
          "money": "4k-6k",
          "site": "沙河",
          "time": "2017-03-20",
          "industry": "\n                                移动互联网,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "锐森亿成",
          "money": "12k-16k",
          "site": "琶洲",
          "time": "2017-04-06",
          "industry": "\n                                电子商务,O2O / 成长型(不需要融资)\n                            "
        },
        {
          "company": "花蜜",
          "money": "8k-15k",
          "site": "岗顶",
          "time": "2017-03-13",
          "industry": "\n                                移动互联网 / 成长型(A轮)\n                            "
        },
        {
          "company": "九安光电",
          "money": "10k-15k",
          "site": "天河区",
          "time": "2017-04-06",
          "industry": "\n                                数据服务,企业服务 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "万户网络",
          "money": "4k-8k",
          "site": "天园",
          "time": "2017-03-16",
          "industry": "\n                                电子商务,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "爱拍原创",
          "money": "10k-15k",
          "site": "东圃",
          "time": "2天前发布",
          "industry": "\n                                文化娱乐 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "广州棒谷网络科技有限公司",
          "money": "10k-20k",
          "site": "白云大道",
          "time": "3天前发布",
          "industry": "\n                                电子商务 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "广东智源",
          "money": "5k-8k",
          "site": "登峰",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "4399游戏",
          "money": "12k-20k",
          "site": "石牌",
          "time": "2天前发布",
          "industry": "\n                                游戏 / 初创型(未融资)\n                            "
        },
        {
          "company": "迪文网络支付",
          "money": "8k-14k",
          "site": "员村",
          "time": "3天前发布",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "广州齐昌网络科技有限公司",
          "money": "6k-8k",
          "site": "棠下",
          "time": "2017-04-12",
          "industry": "\n                                企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "有道",
          "money": "2k-3k",
          "site": "棠下",
          "time": "2017-04-06",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "搜狐视频",
          "money": "8k-14k",
          "site": "广州",
          "time": "2天前发布",
          "industry": "\n                                文化娱乐 / 上市公司\n                            "
        },
        {
          "company": "easymall",
          "money": "20k-40k",
          "site": "天园",
          "time": "2017-04-12",
          "industry": "\n                                电子商务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "皓品",
          "money": "6k-8k",
          "site": "新市",
          "time": "2017-03-25",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "锦行",
          "money": "8k-16k",
          "site": "广州",
          "time": "2017-03-16",
          "industry": "\n                                移动互联网,O2O / 初创型(天使轮)\n                            "
        },
        {
          "company": "定制加",
          "money": "8k-15k",
          "site": "梅花村",
          "time": "3天前发布",
          "industry": "\n                                电子商务,企业服务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广之旅",
          "money": "8k-15k",
          "site": "三元里",
          "time": "2017-04-01",
          "industry": "\n                                旅游 / 初创型(未融资)\n                            "
        },
        {
          "company": "财富恒瑞集团",
          "money": "7k-14k",
          "site": "天河区",
          "time": "3天前发布",
          "industry": "\n                                金融 / 初创型(未融资)\n                            "
        },
        {
          "company": "广州餐道",
          "money": "6k-10k",
          "site": "荔湾区",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,O2O / 成长型(A轮)\n                            "
        },
        {
          "company": "广州嘉际文化传媒有限公司",
          "money": "4k-6k",
          "site": "白云区",
          "time": "3天前发布",
          "industry": "\n                                社交网络,文化娱乐 / 初创型(天使轮)\n                            "
        },
        {
          "company": "毅立特",
          "money": "5k-10k",
          "site": "天河区",
          "time": "2017-04-10",
          "industry": "\n                                电子商务,O2O / 初创型(未融资)\n                            "
        },
        {
          "company": "名医汇",
          "money": "6k-8k",
          "site": "白云大道",
          "time": "2017-03-07",
          "industry": "\n                                移动互联网,医疗健康 / 初创型(未融资)\n                            "
        },
        {
          "company": "君实科技",
          "money": "5k-7k",
          "site": "天河区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,O2O / 初创型(未融资)\n                            "
        },
        {
          "company": "恒聚拆车王",
          "money": "7k-9k",
          "site": "棠下",
          "time": "2017-04-01",
          "industry": "\n                                移动互联网,O2O / 初创型(天使轮)\n                            "
        },
        {
          "company": "白马",
          "money": "12k-18k",
          "site": "新港",
          "time": "2017-03-10",
          "industry": "\n                                移动互联网,电子商务 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广州 K11",
          "money": "15k-25k",
          "site": "天河区",
          "time": "2017-04-12",
          "industry": "\n                                其他 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广州缘创信息科技有限公司",
          "money": "6k-10k",
          "site": "萝岗区",
          "time": "2017-04-10",
          "industry": "\n                                移动互联网,硬件 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "易物网",
          "money": "12k-16k",
          "site": "海珠区",
          "time": "2017-04-06",
          "industry": "\n                                电子商务 / 成长型(A轮)\n                            "
        },
        {
          "company": "因特利",
          "money": "10k-20k",
          "site": "天河区",
          "time": "2017-03-29",
          "industry": "\n                                移动互联网,广告营销 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "杰明科技",
          "money": "5k-10k",
          "site": "沙湾",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "托托洛",
          "money": "10k-16k",
          "site": "棠下",
          "time": "2017-04-11",
          "industry": "\n                                移动互联网,游戏 / 初创型(未融资)\n                            "
        },
        {
          "company": "车事易",
          "money": "10K-20K",
          "site": "番禺区",
          "time": "2017-04-08",
          "industry": "\n                                生活服务,数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "恒聚拆车王",
          "money": "6k-8k",
          "site": "棠下",
          "time": "2017-04-01",
          "industry": "\n                                移动互联网,O2O / 初创型(天使轮)\n                            "
        },
        {
          "company": "麦乐积分",
          "money": "6k-12k",
          "site": "员村",
          "time": "2017-03-28",
          "industry": "\n                                电子商务,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "格安科技有限公司",
          "money": "6k-12k",
          "site": "石牌",
          "time": "3天前发布",
          "industry": "\n                                数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "jarvisBIM",
          "money": "10k-20k",
          "site": "市桥",
          "time": "2天前发布",
          "industry": "\n                                数据服务,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "凝新",
          "money": "5k-10k",
          "site": "荔湾区",
          "time": "2017-04-11",
          "industry": "\n                                其他,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "帮你教",
          "money": "8k-10k",
          "site": "棠下",
          "time": "2017-03-10",
          "industry": "\n                                O2O,移动互联网 / 成长型(B轮)\n                            "
        },
        {
          "company": "广州荔枝网络有限公司",
          "money": "8k-15k",
          "site": "环市东",
          "time": "21:47发布",
          "industry": "\n                                移动互联网,文化娱乐 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "广州迅维",
          "money": "5k-9k",
          "site": "天河公园",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "富力地产",
          "money": "15k-18k",
          "site": "珠江新城",
          "time": "2017-03-28",
          "industry": "\n                                移动互联网,电子商务 / 上市公司\n                            "
        },
        {
          "company": "屈臣氏个人用品商店总部",
          "money": "35k-50k",
          "site": "越秀区",
          "time": "2天前发布",
          "industry": "\n                                电子商务,生活服务 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "技客公司",
          "money": "6k-8k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                其他 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "多好",
          "money": "3k-5k",
          "site": "广州",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "协众软件",
          "money": "3k-5k",
          "site": "天河区",
          "time": "2017-04-05",
          "industry": "\n                                移动互联网,信息安全 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "金搏软件",
          "money": "8k-15k",
          "site": "棠下",
          "time": "1天前发布",
          "industry": "\n                                移动互联网 / 成长型(不需要融资)\n                            "
        },
        {
          "company": "乐藏",
          "money": "8k-16k",
          "site": "新市",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "广州慧嘉互动",
          "money": "13k-18k",
          "site": "赤岗",
          "time": "2017-04-05",
          "industry": "\n                                广告营销 / 初创型(未融资)\n                            "
        },
        {
          "company": "人人码",
          "money": "10k-15k",
          "site": "广州",
          "time": "2017-04-08",
          "industry": "\n                                移动互联网,电子商务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "安久科技",
          "money": "5k-10k",
          "site": "黄村",
          "time": "2天前发布",
          "industry": "\n                                游戏,移动互联网 / 初创型(未融资)\n                            "
        },
        {
          "company": "掌上快销",
          "money": "15k-20k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,企业服务 / 成长型(B轮)\n                            "
        },
        {
          "company": "广东亿迅",
          "money": "7k-12k",
          "site": "天河区",
          "time": "2天前发布",
          "industry": "\n                                其他 / 成熟型(不需要融资)\n                            "
        },
        {
          "company": "列丰科技",
          "money": "6k-12k",
          "site": "番禺区",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,医疗健康 / 初创型(未融资)\n                            "
        },
        {
          "company": "初星科技",
          "money": "8k-15k",
          "site": "大学城",
          "time": "2017-03-28",
          "industry": "\n                                社交网络,数据服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "bmob比目科技",
          "money": "8k-15k",
          "site": "大学城",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,数据服务 / 成长型(B轮)\n                            "
        },
        {
          "company": "微革网络",
          "money": "10k-15k",
          "site": "棠下",
          "time": "2017-03-17",
          "industry": "\n                                移动互联网,企业服务 / 初创型(天使轮)\n                            "
        },
        {
          "company": "部族科技",
          "money": "8k-12k",
          "site": "天河北",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "旭光软件",
          "money": "3k-5k",
          "site": "番禺区",
          "time": "2017-04-07",
          "industry": "\n                                教育 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "麒逸信息",
          "money": "6k-8k",
          "site": "天河区",
          "time": "2017-03-08",
          "industry": "\n                                信息安全,数据服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "阿里巴巴移动事业群-UC",
          "money": "1k-2k",
          "site": "员村",
          "time": "2017-03-07",
          "industry": "\n                                移动互联网 / 成熟型(D轮及以上)\n                            "
        },
        {
          "company": "艾道",
          "money": "5k-10k",
          "site": "小北",
          "time": "2017-03-07",
          "industry": "\n                                移动互联网,数据服务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "江楠鲜品",
          "money": "10k-20k",
          "site": "同德",
          "time": "2017-04-11",
          "industry": "\n                                电子商务 / 初创型(未融资)\n                            "
        },
        {
          "company": "华久信息",
          "money": "5K-9K",
          "site": "大学城",
          "time": "2017-03-20",
          "industry": "\n                                移动互联网,数据服务 / 成长型(A轮)\n                            "
        },
        {
          "company": "大圣科技",
          "money": "12k-24k",
          "site": "芳村",
          "time": "2天前发布",
          "industry": "\n                                移动互联网,O2O / 成长型(不需要融资)\n                            "
        },
        {
          "company": "创发软件开发",
          "money": "4k-8k",
          "site": "岑村",
          "time": "3天前发布",
          "industry": "\n                                移动互联网,电子商务 / 初创型(不需要融资)\n                            "
        },
        {
          "company": "营悦营养",
          "money": "15k-30k",
          "site": "棠下",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网,医疗健康 / 初创型(天使轮)\n                            "
        },
        {
          "company": "爱人类科技",
          "money": "4k-8k",
          "site": "天河区",
          "time": "2017-03-07",
          "industry": "\n                                移动互联网,企业服务 / 初创型(未融资)\n                            "
        },
        {
          "company": "能龙",
          "money": "6k-12k",
          "site": "龙口",
          "time": "2017-04-12",
          "industry": "\n                                移动互联网 / 上市公司\n                            "
        },
        {
          "company": "广州市圣湘琳信息科技有限公司",
          "money": "8k-16k",
          "site": "棠下",
          "time": "2天前发布",
          "industry": "\n                                移动互联网 / 初创型(天使轮)\n                            "
        },
        {
          "company": "高新兴科技集团",
          "money": "5k-10k",
          "site": "萝岗区",
          "time": "2天前发布",
          "industry": "\n                                数据服务,文化娱乐 / 上市公司\n                            "
        }
      ]
    return d
}

const fetchMovies = function() {
    // 使用 ajax 动态获取数据
    // api.fetchMovies(function (d) {
    //     d = JSON.parse(d)
    //     renderChart(d)
    // })
    // 直接使用 JSON 数据 不从后台获取
    var d = webJSON()
    renderChart(d)
}

const initedChart = function() {
    _.each(chartStore, (v, k) => {
        const element = document.getElementById(k)
        const chart = echarts.init(element)
        chartStore[k] = chart
    })
}

const __main = function() {
    initedChart()
    fetchMovies()
}

// $(document).ready() 这个东西是 jQuery 的回调函数
// 是页面内容(只包括元素, 不包括元素引用的图片)载入完毕之后的回调事件
$(document).ready(function() {
    __main()
})
