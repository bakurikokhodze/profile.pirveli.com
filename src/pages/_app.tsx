import {Provider} from 'react-redux';
import "../../styles/globals.css"
import "../../styles/font.css"
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import Script from 'next/script'
import store from "../components/store/index"
import fav from "/public/images/images/fav.png"
import Head from 'next/head'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <meta key="robots" name="robots" content="noindex,follow"/>
          <meta key="googlebot" name="googlebot" content="noindex,follow"/>
          <link rel="apple-touch-icon" sizes="180x180" href={fav.src}/>
          <link rel="icon" type="image/png" sizes="32x32" href={fav.src}/>
          <link rel="icon" type="image/png" sizes="16x16" href={fav.src}/>
        </Head>
        <Script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.6/locale/ka.min.js"/>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
  )
}





