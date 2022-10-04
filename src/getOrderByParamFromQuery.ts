export default function getOrderByParamFromQuery(orderBy: any): any[] {
  return [
    ...Object.keys(orderBy)
      .filter((column: string) => !!orderBy[column])
      .map((column) => {
        return {
          column,
          order: orderBy[column],
        }
      }),
  ]
}
