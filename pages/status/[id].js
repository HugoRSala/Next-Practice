import Tweet from 'components/Tweet'

export default function TweetPage(props) {
  console.log(props)
  return (
    <>
      <Tweet {...props} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/tweets/${id}`)
  if (apiResponse.ok) {
    const props = apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: '/home' }).end()
  }
}
