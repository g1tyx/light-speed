/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Amount': '数量',
    'Break': '突破',
    'Cost': '成本',
    'Multiplier': '倍数',
    'Normal': '普通',
    'Repair Autobuyer': '修理自动购买器',
    'Fix the Speed of Light': '修复光速',
    'Speedboost Effect is stronger': '速度提升效果更强',
    'Unlock Correct Autobuyer': '解锁正确自动购买器',
    'Unlock Fix Autobuyer': '解锁修复自动购买器',
    'Unlock Generator Autobuyers': '解锁发生器自动购买器',
    'Patch Autobuyer': '修补自动购买器',
    'Autobuyer': '自动购买器',
    'Autobuyers': '自动购买器',
    'Break the universe': '突破宇宙',
    'Correct Autobuyer': '修正自动购买器',
    'Correct is log30 instead': '修正改为log30',
    'Correct the Speed of Light': '修正光速',
    'Improve BP and Speedboost': '增强突破点和速度提升',
    'Unlock Patch Autobuyer': '解锁修补自动购买器',
    'Unlock Recover': '解锁恢复',
    'Unlock Recover Autobuyer': '解锁恢复自动购买器',
    'Unlock Repair Autobuyer': '解锁修理自动购买器',
    'Recover Autobuyer': '恢复自动购买器',
    'Recover the Speed of Light': '恢复光速',
    'Patch the Speed of Light': '修补光速',
    'Improvement': '改进',
    'Improve the Speed of Light': '改进光速',
    'Improve BP formula': '改进突破点公式',
    'Repair the Speed of Light': '修理光速',
    'Fix Autobuyer': '修复自动购买器',
    'Fix is 3x instead': '修复效率x3',
    'Gain 100% of BP every second': '每秒获得100%的突破点',
    'Patch is 0.1 instead': '修补改为0.1',
    'Repair also multiplies by 1.5x': '修理也乘以1.5倍',
    'Repair gives +1 instead': '修理改为+1',
    'You get x Speed Boost Per Sec': '你每秒将获得x速度提升',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

    //原样
    'Two': '二',
    'Three': '三',
    'Six': '六',
    'One': '一',
    'Four': '四',
    'Five': '五',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "Amount: ": "数量: ",
    "Multiplier: ": "倍数: ",
    "Speed Generator ": "速度产生器 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^The Speed of Light is (.+) Meters Per Second$/, '当前光速为每秒 $1 米'],
    [/^SOL is (.+) Meters\/s\/s faster$/, 'SQL的速度为 $1 米/秒'],
    [/^SOL is log(.+)\(BP\)x faster$/, 'SQL的速度为 log$1\(突破点\)'],
    [/^SOL is log(.+)\(Meters\)x faster$/, 'SQL的速度为 log$1\(米\)'],
    [/^You get (.+) Speed Boost$/, '你得到 $1 速度提升'],
    [/^Break the SOL for (.+) Break Points$/, '突破 SOL 以获得 $1 突破点'],
    [/^You have (.+) Break Points$/, '你有$1 突破点'],
    [/^You have (.+) Speed Boost boosting SOL by (.+)$/, '你有$1 速度提升，提升了 SOL $2'],
    [/^You have traveled (.+) Meters$/, '您已经旅行了 $1 米'],
    [/^SOL is ([\d\.]+) Meters\/s faster$/, 'SOL的速度提高了 $1 米\/秒'],
    [/^SOL is ([\d\.]+)x faster$/, 'SOL的速度提高了 $1 倍'],
    [/^Cost\: (.+) BP$/, '成本\: $1 突破点'],
    [/^Cost\: (.+) Meters$/, '成本\: $1 米'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);