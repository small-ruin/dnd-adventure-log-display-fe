interface Log {
  id: number,
  name:　string,
  content: string,
  createdAt: string,
  adventure?: Adventure,
}
interface Adventure {
  id: number,
  name: string,
  createAt: string,
  logs: Log[],
  order: string,
}
interface SearchResult {
    id: number,
    name: string,
    results: string[],
}

export type {
  Log,
  Adventure,
  SearchResult,
}
