export interface LogDetail extends Log {
  content: string,
  adventure: Adventure,
}
export interface Log {
  id: number,
  name:　string,
  createdAt: string,
}
export interface Adventure {
  id: number,
  name: string,
  createAt: string,
  logs: Log[],
  order: string,
}
export interface SearchResult {
    id: number,
    name: string,
    results: string[],
}
