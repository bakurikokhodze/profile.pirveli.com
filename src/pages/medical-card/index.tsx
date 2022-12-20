import Head from 'next/head';
import Image from 'next/image';
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Layout from "../../components/layouts/profile-layout";
// @ts-ignore
import {userBgIcon} from "/public/images/icons";
// @ts-ignore
import Cards from "/public/images/icons/nav/navCards";
// @ts-ignore
import Points from "/public/images/icons/nav/navPoints";
// @ts-ignore// @ts-ignore
import React, {useEffect, useState} from "react";
import TicketItem from "../../components/blocks/ticket-item";
import axios from "axios";
import {Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import Link from "next/link";

export default function MedicalCardsPage() {
  const baseApi = process.env.baseApi;
  const [medicalCards, setMedicalCards] = useState([]);
  const [cardsTbc, setCardsTbc] = useState([]);

  const addCard = () => {
    // axios.post(`${baseApi}/bog/saveCard`).then((res) => {
    //   let link = res?.data?.links[1]?.href;
    //   typeof window !== 'undefined' && window.open(link, '_self');
    //
    // })
  }

  const getMedicalCard = () => {
    axios.get(`${baseApi}/bog/medicalcard`).then((res) => {
      setMedicalCards(res.data)
    })
  }

  useEffect(() => {
    getMedicalCard();
  }, [])


  const getIcon = (bank: string) => {

    switch (bank) {
      case "AMEX":
        return ICONS.ae
      case "MC":
        return ICONS.mc
      case "VISA":
        return ICONS.visa
      default :
        return ICONS.visa
    }

  }

  const getColorByColor = (bank: string) => {
    switch (bank) {
      case "AMEX":
        return "rgba(245,206,90,0.5)"
      case "MC":
        return "rgba(56,56,56,0.5)"
      case "VISA":
        return "rgba(109,208,231,0.5)"
      default :
        return "rgba(109,208,231,0.5)"
    }
  }


  const deleteCard = (id: number) => {
    axios.post(`${baseApi}/წასჰლა`, {
          // @ts-ignore
          cardIds: [id]
        }
    ).then((res) => {
      getMedicalCard()
    })

  }

  const confirm = (id: number) => {

    Modal.confirm({
      title: 'შეტყობინება',
      icon: <ExclamationCircleOutlined/>,
      content: 'ნადმვილად გსურთ ბარათის წაშლა?',
      okText: 'წაშლა',
      cancelText: 'გაუქმება',
      className: "confirm",
      onOk: () => deleteCard(id)
    });

  };

  return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/public/favicon.ico"/>
        </Head>

        {
          (Array.isArray(medicalCards) && medicalCards.length > 0) ? <div className={"w-full"}>

            <h2 className={"text-[32px] text-[#383838] font-bold"}>
              ჯანდაცვის ბარათები
            </h2>

            <div
                className={"md:gap-[30px] gap-[8px] grid lg:grid-cols-3 grid-cols-2 my-[40px] pb-0 mb-[120px] md:mb-0"}>
              <div
                  className={"w-full bg-[#db006033] rounded-xl sm:h-[160px] h-[109px] flex items-center justify-center cursor-pointer"}
                  onClick={() => addCard()}>
                <div>
                  <p className={"text-red text-center"}>+</p>
                  <p className={"text-red text-center"}>დაამატე ბარათი</p>
                </div>
              </div>

              {
                  Array.isArray(medicalCards) && medicalCards.map((e: any, index: number) => {
                    return <div
                        key={index}
                        className={"w-full rounded-xl relative sm:h-[160px] h-[109px] md:pb-[30px] pb-4 flex items-end "}
                        style={{
                          backgroundColor: getColorByColor(e.cardType)
                        }}
                    >
                      <div className={"absolute md:top-[34px] md:left-[34px] top-4 left-4"}>
                        <Image src={getIcon(e.cardType)} alt={"icon"}/>
                      </div>

                      <div className={"absolute md:top-[34px] md:right-[34px] top-4 right-4 cursor-pointer"}
                           onClick={() => confirm(e.id)}
                      >
                        <Image src={ICONS.trash} alt={"icon"}/>
                      </div>

                      <p className={"text-red text-start md:ml-[30px] ml-4 font-bold text-base"}
                         style={{
                           color: "#FFFFFF"
                         }}
                      >{e?.pan}</p>
                    </div>
                  })
              }

            </div>

          </div> : <div className={"w-full bg-[white] h-[560px] rounded-xl flex flex-col items-center py-[92px]"}>
            <div className={"w-[170px] h-[170px] flex"}>
              <img src={IMAGES.medicalCard.src} width={170} height={170}/>
            </div>
            <p className={"mt-6 text-[18px] text-[#383838]"}>თქვენ ეს ბარათი ჯერ არ გაქვთ შეძენილი</p>
            <Link href={"https://medical.pirveli.com/buyCardPage/"}>
              <button type={"submit"}
                      className={"bg-red px-6 h-[48px] w-min self-end mt-6 rounded-xl cursor-pointer m-auto"}>
                <p className={"text-[white]"}>შეიძინე</p>
              </button>
            </Link>

          </div>
        }

      </div>
  )
}

MedicalCardsPage.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}