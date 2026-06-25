interface ToolEntry {
  slug: string;
  title: string;
  description: string;
}

const onlineTools: ToolEntry[] = [
  {
    slug: 'gzh',
    title: '视频号封面设计',
    description: '在线设计视频号封面卡片，支持自定义背景、图标、字体、颜色，一键导出高清 PNG',
  },
];

export default onlineTools;
export type { ToolEntry };
