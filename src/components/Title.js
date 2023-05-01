import Head from "next/head";

const Title = (props) => {
  return (
    <Head>
        <title>{props.children}</title>
    </Head>
  )
}

export default Title