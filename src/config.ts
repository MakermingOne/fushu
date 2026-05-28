export interface SiteConfig {
  language: string;
  brandName: string;
  copyright: string;
}

export interface NavigationConfig {
  infoLinkLabel: string;
}

export interface ContactEntry {
  label: string;
  value: string;
  href?: string;
}

export interface InfoPageConfig {
  backLinkLabel: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  contactLabel: string;
  contactEntries: ContactEntry[];
}

export interface OverlayConfig {
  frameDetailLabel: string;
  fileLabel: string;
  seriesLabel: string;
  closeLabel: string;
}

export interface ImageItem {
  src: string;
  category: string;
  title: string;
  description: string;
}

export interface GalleryConfig {
  images: ImageItem[];
}

export const siteConfig: SiteConfig = {
  language: "zh-CN",
  brandName: "负鼠表情包",
  copyright: "© 2026 负鼠精神嘴替",
};

export const navigationConfig: NavigationConfig = {
  infoLinkLabel: "关于",
};

export const infoPageConfig: InfoPageConfig = {
  backLinkLabel: "返回",
  eyebrow: "关于 — 负鼠表情包图鉴",
  title: "丑萌负鼠，打工人的精神嘴替。",
  paragraphs: [
    "2026年5月，一只北美负鼠意外闯入民居后被拍下的照片，在国内互联网掀起了一场表情包狂欢。这只背着手、踮着脚、望向窗外的负鼠，以其独特的「老干部姿态」和落寞神情，精准戳中了当代年轻人「丧而不废、摆烂又自愈」的集体情绪。",
    "负鼠的「装死」本能——遇到危险就倒地假死——完美对应了年轻人的职场生存哲学：表面淡定从容，内心早已崩溃；收到消息秒回「好的」，实际上灵魂已经出走。这种丑萌反差、戏谑自嘲的表达方式，让负鼠迅速成为全网最火的「精神嘴替」。",
    "本站搜集整理了24张精选负鼠表情包，涵盖装死、躺平、崩溃、自愈等职场全场景。每一张都配有扎心中文文案，致力于为广大打工人提供最精准的情绪表达工具。记住：又活了一天，已经很厉害了。",
  ],
  contactLabel: "联系方式",
  contactEntries: [
    { label: "精神热线", value: "装死中，请勿打扰", href: undefined },
    { label: "负鼠专线", value: "收到，办不到", href: undefined },
    { label: "情绪投递", value: "在装死，有事吗？", href: undefined },
  ],
};

export const overlayConfig: OverlayConfig = {
  frameDetailLabel: "表情包详情",
  fileLabel: "文件",
  seriesLabel: "系列",
  closeLabel: "关闭",
};

export const galleryConfig: GalleryConfig = {
  images: [
    {
      src: "/images/meme_01.jpg",
      category: "经典款",
      title: "表面平静 内心崩溃",
      description: "背手眺望窗外的负鼠，姿态像个沉思的老干部，眼神却透着一丝落寞与无奈。完美复刻「表面平静、内心崩溃」的打工人日常状态。",
    },
    {
      src: "/images/meme_02.jpg",
      category: "装死系列",
      title: "收到，办不到",
      description: "负鼠在办公桌上装死，四肢朝天，周围散落着文件和咖啡杯。这是每个打工人收到不可能完成任务时的标准反应。",
    },
    {
      src: "/images/meme_03.jpg",
      category: "灵魂出走路",
      title: "两眼放空 灵魂出走",
      description: "深夜加班的负鼠坐在电脑前， staring blankly at spreadsheets。眼睛里的光芒已经熄灭，只剩躯壳还在工位上。",
    },
    {
      src: "/images/meme_04.jpg",
      category: "装死系列",
      title: "在装死，有事吗",
      description: "负鼠蜷缩在办公桌下，用一件旧卫衣当枕头，睡得不省人事。同事喊你的时候，这就是最佳躲避姿势。",
    },
    {
      src: "/images/meme_05.jpg",
      category: "通勤地狱",
      title: "上班如上坟",
      description: "负鼠在拥挤的地铁里抓着扶手，眼神中满是惊恐和困惑。每天早高峰的通勤，就是一场精神上的上坟之旅。",
    },
    {
      src: "/images/meme_06.jpg",
      category: "干饭负鼠",
      title: "工资是精神损失费",
      description: "负鼠盯着空掉的泡面杯，眼神中的失望无法掩饰。这碗泡面就是对今天所有辛苦的精神补偿。",
    },
    {
      src: "/images/meme_07.jpg",
      category: "崩溃边缘",
      title: "又活了一天 已经很厉害了",
      description: "负鼠靠在楼梯间的墙上，一只爪子按着额头，满脸写着「为什么是我」。但没关系，又活了一天，已经很厉害了。",
    },
    {
      src: "/images/meme_08.jpg",
      category: "干饭负鼠",
      title: "别问，问就是在忙",
      description: "负鼠从冰箱里探出头来，眼睛发亮，周围全是剩菜。不是在忙工作，是在忙活着找吃的。",
    },
    {
      src: "/images/meme_09.jpg",
      category: "躺平系列",
      title: "遇事躺平 拒绝内耗",
      description: "负鼠在雨中长椅上躺平，四肢摊开，任由雨水打在身上。这是一种高级的生活智慧：既然打不过，那就躺下。",
    },
    {
      src: "/images/meme_10.jpg",
      category: "灵魂出走路",
      title: "我能打起什么精神？",
      description: "负鼠对着镜子里的自己发呆，仿佛在问：「我是谁？我在哪？我为什么要上班？」这是一切存在主义危机的起点。",
    },
    {
      src: "/images/meme_11.jpg",
      category: "崩溃边缘",
      title: "这班非上不可吗",
      description: "负鼠坐在工位上，身后的屏幕显示着「SYSTEM FAILURE」。它的表情说明了一切：这个班，真的非上不可吗？",
    },
    {
      src: "/images/meme_12.jpg",
      category: "经典款",
      title: "我是自愿上班的",
      description: "负鼠拖着疲惫的步伐走在走廊里，两侧的墙上挂着「TEAMWORK」和「EXCELLENCE」的标语。嗯，完全自愿。",
    },
    {
      src: "/images/meme_13.jpg",
      category: "深夜emo",
      title: "人类的悲欢并不相通",
      description: "凌晨三点的便利店里，负鼠独自坐在小凳上，捧着一罐咖啡。周围是整齐的货架，外面是霓虹灯闪烁的街道。人类的悲欢并不相通，我只觉得他们吵闹。",
    },
    {
      src: "/images/meme_14.jpg",
      category: "装死系列",
      title: "活着回来就是胜利",
      description: "负鼠从垃圾桶里探出头来，嘴里还叼着半块面包，眼神里写满了骄傲。今天能从公司活着回来，就是最大的胜利。",
    },
    {
      src: "/images/meme_15.jpg",
      category: "通勤地狱",
      title: "下班不积极 思想有问题",
      description: "负鼠在电梯里缩在角落，紧紧抱着纸袋午餐，眼神警觉。下班时间一到，跑得比谁都快，这才是正确的职场态度。",
    },
    {
      src: "/images/meme_16.jpg",
      category: "躺平系列",
      title: "躺平了 但还没完全躺",
      description: "负鼠趴在瑜伽垫上，四肢以不可能的角度摊开，眼神空洞。想躺平但 conscience 不允许，这就是当代年轻人的拧巴。",
    },
    {
      src: "/images/meme_17.jpg",
      category: "深夜emo",
      title: "Deadline是第一生产力",
      description: "凌晨两点，负鼠穿着睡衣在厨房里煮东西。Deadline 前的焦虑只有在深夜做饭才能得到缓解。锅里煮的不是食物，是对明天的恐惧。",
    },
    {
      src: "/images/meme_18.jpg",
      category: "深夜emo",
      title: "平静的疯感",
      description: "负鼠站在阳台栏杆旁，望着城市夜景，旁边放着一杯咖啡和一个烟灰缸。它不说话，只是静静地发疯。这种平静的疯感，是成年人最高级的情绪管理。",
    },
    {
      src: "/images/meme_19.jpg",
      category: "灵魂出走路",
      title: "在做了（新建文件夹）",
      description: "负鼠戴着耳机坐在工位上，面前是双屏幕的 Excel 表格。老板问进度的时候，「在做了」就是最大的善意谎言。",
    },
    {
      src: "/images/meme_20.jpg",
      category: "装死系列",
      title: "精神稳定一分钟已经很厉害了",
      description: "负鼠躲在纸箱里，只露出鼻子和胡须，周围是未付的账单。在这个疯狂的世界里，保持精神稳定一分钟已经很厉害了。",
    },
    {
      src: "/images/meme_21.jpg",
      category: "经典款",
      title: "这个班就上到这吧",
      description: "负鼠站在上升的扶梯上，回头望向身后，眼神中既有解脱又有不舍。这个班，今天就上到这吧。明天的事明天再说。",
    },
    {
      src: "/images/meme_22.jpg",
      category: "崩溃边缘",
      title: "周一想死 周五活着",
      description: "负鼠瘫在破沙发上，手里握着遥控器，周围是零食袋。电视的光打在脸上，这是周五晚上最幸福的时刻。周一想死，周五活着，这就是打工人的情绪周期。",
    },
    {
      src: "/images/meme_23.jpg",
      category: "经典款",
      title: "工资一千八 整天笑哈哈",
      description: "负鼠从办公室门后探出头来，警惕地观察着四周。工资一千八，整天笑哈哈。不是真的开心，是已经疯了。",
    },
    {
      src: "/images/meme_24.jpg",
      category: "治愈系",
      title: "又癫又丧 又怪又治愈",
      description: "负鼠站在屋顶上，张开双臂迎接日出。城市在身后苏醒，新的一天开始了。负鼠告诉我们：你可以又癫又丧，又怪又治愈。这就是生活的真相。",
    },
  ],
};
