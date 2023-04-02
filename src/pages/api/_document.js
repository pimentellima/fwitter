import { Html, Main, NextScript } from "next/document";
import Head from "next/head";
import '../globals.css';

const Document = () => {
  
  return(
    <Html>
      <Head>
        <title>fwitter</title>
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
    )
}

export default Document;