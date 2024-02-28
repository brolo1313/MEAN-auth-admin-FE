

export const navigation: any[] = [
  {
    id: 'dashboard',
    title: 'dashboard',
    type: 'item',
    icon: '&#xE017;',
    url: '/admin/dashboard'
  },

  {
    id: 'contacts',
    title: 'Contacts',
    type: 'item',
    icon: '&#xE019;',
    url: '/admin/contacts',
  },


].sort((a, b) => a.title.localeCompare(b.title)) as [];
