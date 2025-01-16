export const formatDate = (date: string | number | Date) =>
  new Date(date).toLocaleDateString('uk-UA')
