import type { CustomFlowbiteTheme } from 'flowbite-react'

export const customFlowbiteThemeConfig: CustomFlowbiteTheme = {
  tooltip: {
    style: {
      dark: 'bg-secondary text-white',
    },
    arrow: {
      base: 'absolute z-10 h-4 w-4 rotate-45',

      style: {
        dark: 'bg-secondary',
      },
    },

    base: 'absolute z-10 inline-block rounded-[22px] px-3 py-2 text-sm font-medium shadow-sm',
    content: 'relative z-20 capitalize',
  },

  card: {
    root: {
      base: 'flex rounded-lg bg-white dark:bg-boxdark shadow-15 dark:shadow-none',
    },
  },

  modal: {
    root: {},
    header: {
      base: 'flex flex-col-reverse gap-2 p-3',
      title: 'self-center text-dark dark:text-white text-[32px] font-semibold text-[#000]',
      close: {
        base: 'bg-black p-1 rounded-full text-white self-end',
        icon: 'h-3 w-3',
      },
    },

    content: {
      inner: 'relative flex max-h-[90dvh] flex-col rounded-[24px] bg-white shadow dark:bg-gray-700',
    },

    body: {
      base: 'flex-1 overflow-auto py-6 px-8 pb-10',
    },
  },

  button: {
    size: {
      md: 'px-4 py-2 text-base',
    },
    color: {
      light:
        'border border-dark bg-white text-gray-900 focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:focus:ring-gray-700 dark:enabled:hover:border-gray-700 dark:enabled:hover:bg-gray-700',
      info: 'border border-transparent bg-primary text-white enabled:hover:bg-primary dark:bg-primary dark:focus:ring-cyan-800 dark:enabled:hover:bg-primary',
    },
    base: '',
  },

  dropdown: {
    floating: {
      item: {
        base: 'flex w-full cursor-pointer items-center justify-start px-6 py-2 text-base text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
      },
      base: 'z-10 w-fit divide-y divide-gray-100 rounded-[24px] shadow focus:outline-none',
    },
    content: 'px-0 py-6',
  },
}
