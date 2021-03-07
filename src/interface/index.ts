interface Log {
  id: number,
  name:　string,
  content: string,
  createAt: string,
}
interface Adventure {
  id: number,
  name: string,
  createAt: string,
  logs: Log[],
}

export type {
  Log,
  Adventure,
}
