

export const navigation: any[] = [
  {
    id: 'dashboard',
    title: 'dashboard',
    type: 'item',
    icon: 'home',
    path: '/admin/dashboard'
  },

  {
    id: 'contacts',
    title: 'Contacts',
    type: 'item',
    icon: 'waves',
    path: '/admin/contacts',
  },


].sort((a, b) => a.title.localeCompare(b.title)) as [];
