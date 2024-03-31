import FontAwesome from '@expo/vector-icons/FontAwesome'

function FontAwesomeIcon({
  size = 28,
  style = { marginBottom: -3 },
  ...props
}: React.ComponentProps<typeof FontAwesome>) {
  return <FontAwesome size={size} style={style} {...props} />
}

export default FontAwesomeIcon
