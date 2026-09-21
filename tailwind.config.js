/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    'app/**/*.{js,ts,jsx,tsx,mdx}',
    'components/**/*.{js,ts,jsx,tsx,mdx}',
    'layouts/**/*.{js,ts,jsx,tsx,mdx}',
    'content/**/*.{md,mdx}',
    'node_modules/pliny/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // === 同行实验室 设计 token（基于废才俱乐部深拆 + 微调）===
        // 主品牌强调色：薄荷青绿
        accent: {
          DEFAULT: '#00E0C7',
          hover: '#00F5D4',
          press: '#00C7B0',
        },
        // 成功/已购信号
        success: '#00A85A',
        // 微信绿（保留以便未来会员群入口）
        wechat: '#07C160',
        // 危险
        danger: '#E04444',
        // 暗色语义
        ink: {
          DEFAULT: '#E8ECEF',
          2: '#A8B0B8',
          3: '#7C858E',
        },
        // 暗色底色
        bg: {
          DEFAULT: '#0A0A0A',
          alt: '#08090B',
          card: '#111418',
        },
        // 亮色底色（暖米色，比纯白更有质感）
        paper: {
          DEFAULT: '#F5F2EC',
          alt: '#EDE7DC',
          card: '#FFFFFF',
        },
        // 暗色分隔线
        hair: {
          DEFAULT: '#1A1D22',
          dim: '#262A31',
        },
        // 亮色分隔线
        rule: {
          DEFAULT: '#E6E1D6',
          dim: '#D4CFC2',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-noto-sans-sc)',
          '"PingFang SC"',
          '"Alibaba PuHuiTi"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
        mono: [
          'var(--font-jetbrains-mono)',
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink.DEFAULT'),
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              fontWeight: '500',
              padding: '0.1rem 0.3rem',
              borderRadius: '0.25rem',
              backgroundColor: 'rgba(0, 224, 199, 0.08)',
              color: '#00E0C7',
            },
            'code:before': { content: 'none' },
            'code:after': { content: 'none' },
          },
        },
        invert: {
          css: {
            '--tw-prose-links': theme('colors.accent.hover'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}