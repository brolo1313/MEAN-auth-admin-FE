

export const settings_navigation: any[] = [
    {
      id: 'main',
      link_name: 'Загальні',
      path: '/admin/profile-settings',
    },
  
    {
      id: 'change-password',
      link_name: 'Змінна паролю',
      path: '/admin/profile-settings/change-password',
    },
  
  
  ].sort((a, b) => a.link_name.localeCompare(b.link_name)) as [];
  