

export const navigation: any[] = [
  {
    id: 'dashboard',
    link_name: 'Dashboard',
    type: 'item',
    icon: 'home',
    path: '/admin/dashboard',
    sub_menu: []
  },

  {
    id: 'contacts',
    link_name: 'Contacts',
    type: 'item',
    path: null,
    icon: 'waves',
    sub_menu: [
      {
        link_name: "About Us",
        path: '/admin/contacts',
      },
      // {
      //   link_name: "JavaScript",
      //   link: "/javascript",
      // },
      // {
      //   link_name: "PHP & MySQL",
      //   link: "/php-n-mysql",
      // }
    ]
  },


].sort((a, b) => a.link_name.localeCompare(b.link_name)) as [];
