const placeholder =
  'https://firebasestorage.googleapis.com/v0/b/public-images-5e8be.appspot.com/o/404.jpg?alt=media'

export function hasImage(value: string) {
  return value !== 'N/A' ? value : placeholder
}
