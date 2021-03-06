interface Log {
  id: number,
  name:　string,
  content: string,
  createdAt: string,
}
interface Adventure {
  id: number,
  name: string,
  createdAt: string,
  logs: Log[],
}

export type {
  Log,
  Adventure,
}