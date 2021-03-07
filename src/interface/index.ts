interface Log {
  id: number,
  name:　string,
  content: string,
  createdAt: string,
}
interface Adventure {
  id: number,
  name: string,
  createAt: string,
  logs: Log[],
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
