import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <meta
            property="og:url"
            content="https://futurama-fan-site.vercel.app/"
          /> */}
          <meta property="og:title" content="Welcoming site" />
          <meta property="og:description" content="Enjoy home decorating" />
          <meta property="og:image" content="/vercel.svg" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link href="/fonts/fonts.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
