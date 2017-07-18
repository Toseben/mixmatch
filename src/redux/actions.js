export function setGeometry(row, id) {
  return { type: 'SET_GEOMETRY',
    row: row,
    id: id
  }
}
