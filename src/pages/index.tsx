import Head from 'next/head';
import Image from 'next/image';
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Donut from "../components/charts/donut";
import Layout from "../components/layouts/profile-layout";

// @ts-ignore
import Cards from "/public/images/icons/nav/navCards";
// @ts-ignore
import Points from "/public/images/icons/nav/navPoints";
import CountUp from 'react-countup';
// @ts-ignore
import Tickets from "/public/images/icons/nav/navTickets";
import Slider from "../components/UI/slider/tickets";
import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import Transaction from "../../public/images/icons/nav/transaction";
import ChangeAvatar2 from "../components/UI/modal/ChangeAvatar"
import LeaderBoard from "../components/blocks/leaderboaord";
import {useSelector} from "react-redux";
import TransactionsTable from "../components/blocks/transactions-table";
import Link from "next/link";
import Lari from "../../public/images/icons/lari";
import Logout from "../../public/images/icons/nav/navLogout";

export default function Profile() {
  const [isOpenChooseModal, setIsOpenChooseModal] = useState<boolean>(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [spentPoints, setSpentPoints] = useState(0);
  const userInfo = useSelector((state: any) => state.user.userInfo);

  useEffect(() => {
    setCurrentPoints(userInfo?.accountDetail?.amountOfPoint?.amountOfPoints)
    setSpentPoints(userInfo?.accountDetail?.amountOfSpentPoints?.amountOfSpentPoints)
  }, [userInfo])

  const getChosenAvatar = () => {

    switch (parseInt(userInfo?.avatar?.path)) {
      case 1:
        return IMAGES.avatar1.src
      case 2:
        return IMAGES.avatar2.src
      case 3:
        return IMAGES.avatar3.src
      case 4:
        return IMAGES.avatar4.src
      case 5:
        return IMAGES.avatar5.src
      case 6:
        return IMAGES.avatar6.src
      default :
        return IMAGES.avatar1.src

    }
  }

  return (
      <div>
        <Head>
          <title>Profile.pirveli.com</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/public/favicon.ico"/>
        </Head>

        <ChangeAvatar2 setIsOpenChooseModal={setIsOpenChooseModal} isOpenChooseModal={isOpenChooseModal}/>

        <div className={"grid grid-cols-2 xl:gap-[30px] gap-4 md:pb-[30px] pb-[100px]"}>
          <div
              className={"w-full lg:col-span-1 col-span-2 bg-[white] flex items-center rounded-xl xl:p-[30px] xl:pl-[30px] p-[18px] pl-[22px] relative"}>
            <div
                onClick={() => setIsOpenChooseModal(true)}
                className={"group md:w-[88px] md:h-[88px] h-[40px] w-[40px] mr-4 relative flex items-center justify-center rounded-xl py-[5px] cursor-pointer"}
                style={{
                  transition: "0.5s",
                  backgroundColor: userInfo?.avatar?.code ? "#" + userInfo?.avatar?.code : "#DB0060"
                }}>

              <div
                  className={"absolute rounded-xl bottom-0 top-0 left-0 right-0 bg-transparent group-hover:bg-[#3838387F] flex items-center justify-center"}
                  style={{
                    transition: "0.5s"
                  }}
              >
                <div
                    className={"opacity-0 rotate-90 group-hover:rotate-0 scale-75 group-hover:scale-125 group-hover:opacity-100"}
                    style={{
                      transition: "0.3s"
                    }}
                >
                  <Image src={ICONS.change} alt={"change icon"}/>
                </div>
              </div>
              <img src={getChosenAvatar()} alt={"avatar"}
                   width={88} height={88}
                   style={{objectFit: "cover", height: "100%", width: "auto"}}/>
            </div>

            <p className={"text-dar md:text-[18px] text-[14px] font-bold"}>{userInfo?.details?.firstName} {userInfo?.details?.lastName}</p>
            <div className={"absolute hidden md:flex right-6 bottom-0"}>
              <Image src={ICONS.userBgIcon} alt={"background"}/>
            </div>
            <Link href={"/profile-edit"}>
              <div className={"absolute bg-[white] md:right-6 right-[65px] top-6 cursor-pointer"}>
                <Image src={ICONS.edit} alt={"edit icon"}/>
              </div>
              <div className={"flex md:hidden absolute right-[20px] top-6 cursor-pointer"}>
                <Logout
                    color={"#DB0060"}/>
              </div>
            </Link>

          </div>
          <div
              className={"w-full lg:col-span-1 col-span-2 bg-[white] rounded-xl xl:p-[30px] p-4 ph:pb-[22px] pb-[20px] ph:pt-[24px] pt-[20px] ph:pr-[24px] pr-[20px] flex justify-between items-start relative"}>
            <div className={"flex h-full"}>
              <div className={"h-full"}>
                <p className={"ph:text-base text-[12px] text-dark font-bold"}>ბალანსი</p>
                <div className={"ph:text-[24px] mt-2 text-base text-dark mb-[17px] flex items-center"}>
                  <CountUp duration={1}
                           end={userInfo?.accountDetail?.amountOfGel?.amountOfGel}
                           separator=","
                      // decimals={4}
                           decimal="," start={userInfo?.accountDetail?.amountOfGel?.amountOfGel * 0.85}/>
                  <Lari classes={"ml-[2px] mt-[3px]"} color={"#383838"} width={18} height={20}/>
                </div>
                <span className={"ph:text-[14px] text-[12px] text-[#9766F0] cursor-pointer"}>+ ბალანსის შევსება</span>
              </div>
              <div>
                <p className={"ph:text-base text-[12px] text-dark font-bold"}>ID</p>
                <p className={"text-dark7 text-base mt-2"}>{userInfo?.accountDetail?.accountId}</p>
              </div>
            </div>

            <div className={"absolute right-0 bottom-0 hidden ph:flex"}>
              <Image src={ICONS.balance} alt={"background"}/>
            </div>

            <div className={"rounded-[50%] ph:flex hidden justify-center items-center bg-[#F5CE5A] w-[44px] h-[44px]"}>
              <Cards color={"#FFFFFF"}/>
            </div>

          </div>
          <div
              className={"w-full lg:col-span-1 col-span-2 bg-[white] ph:pt-[24px] pt-5 rounded-xl xl:pr-[24px] ph:pr-4 pr-5 xl:pl-[30px] ph:pl-4 pl-5 ph:pb-[30px] pb-5 relative"}>
            <div className={"flex justify-between items-center"}>
              <p className={"text-base text-dark font-bold"}>მონეტები</p>
              <div className={"rounded-[50%] flex justify-center items-center bg-red w-[44px] h-[44px] hidden ph:flex"}>
                <Points color={"#FFFFFF"}/>
              </div>
            </div>
            <div className={"mt-4 flex ph:space-x-[25px] space-x-4"}>
              <div className={"w-[117px] h-[117px] "}>
                <Donut/>
              </div>
              <div className={"flex flex-col justify-around"}>
                <div className={"flex ph:items-center items-start flex-col ph:flex-row mt-2 ph:mt-0"}>
                  <div className={"flex items-center"}>
                    <div className={"ph:w-[10px] ph:h-[10px] h-[5px] w-[5px] bg-red rounded-[50%]"}/>
                    <p className={"text-dark7 ph:text-[12px] text-[14px] ml-[6px]"}>გამომუშავებული</p>
                  </div>

                  <p className={"text-dark ml-2.5 ph:text-[18px] text-[14px]"}>
                    <CountUp duration={1}
                             end={currentPoints + spentPoints}
                             separator=","
                             start={(currentPoints + spentPoints) * 0.75}/>
                  </p>
                </div>
                <div className={"flex ph:items-center items-start flex-col ph:flex-row mt-2 ph:mt-0"}>
                  <div className={"flex items-center"}>
                    <div className={"ph:w-[10px] ph:h-[10px] h-[5px] w-[5px] bg-[#9766F0] rounded-[50%]"}/>
                    <p className={"text-dark7 text-[12px] ml-[6px]"}>მიმდინარე</p>
                  </div>

                  <p className={"text-dark ml-2.5 ph:text-[18px] text-[14px]"}>
                    <CountUp duration={1} end={currentPoints}
                             separator=","
                             start={currentPoints * 0.75}/>
                  </p>
                </div>
                <div className={"flex ph:items-center items-start flex-col ph:flex-row mt-2 ph:mt-0"}>
                  <div className={"flex items-center"}>
                    <div className={"ph:w-[10px] ph:h-[10px] h-[5px] w-[5px] bg-[#EDC520] rounded-[50%]"}/>
                    <p className={"text-dark7 text-[12px] ml-[6px]"}>დახარჯული</p>
                  </div>

                  <p className={"text-dark ml-2.5 ph:text-[18px] text-[14px]"}>
                    <CountUp duration={1} end={spentPoints}
                             separator=","
                             start={spentPoints * 0.75}/></p>
                </div>
              </div>
            </div>
            <div className={"absolute right-0 bottom-0 hidden ph:flex"}>
              <Image src={ICONS.pointsBg} alt={"background"}/>
            </div>
          </div>
          <div className={"w-full lg:col-span-1 col-span-2 flex flex-col bg-[white] pt-[24px] rounded-xl relative"}>
            <div className={"flex justify-between items-center pr-[24px] pl-[30px]"}>
              <p className={"ph:text-base text-[14px] text-dark font-bold ph:mb-0 mb-[7px]"}>გათამაშების ბილეთები</p>
              <div
                  className={"hidden ph:flex rounded-[50%] flex justify-center items-center bg-[#9766F0] w-[44px] h-[44px]"}>
                <Tickets color={"#FFFFFF"}/>
              </div>
            </div>

            <div className={"absolute right-0 bottom-0"}>
              <Image src={ICONS.ticketsBg} alt={"background"}/>
            </div>

            <div className={"h-full flex-1"}>
              <Slider/>
            </div>
          </div>

          <div className={"w-full col-span-2 col-span-2 py-[30px] bg-[white] rounded-xl px-4 md:px-[30px]"}>
            <LeaderBoard/>
          </div>

          <div
              className={"w-full col-span-2 removeHeaderBg col-span-2 pt-[30px] bg-[white] rounded-xl md:px-[30px] px-[20px]"}>

            <div className={"flex justify-between items-center pb-[px] mb-[19px]"}>
              <p className={"ph:text-base text-[14px] text-dark font-bold"}>მონეტების ტრანზაქციები</p>
              <div
                  className={"hidden ph:flex rounded-[50%] justify-center items-center bg-[#5DB039] w-[44px] h-[44px]"}>
                <Transaction color={"#FFFFFF"}/>
              </div>
            </div>

            <TransactionsTable/>

          </div>

        </div>

      </div>
  )
}

Profile.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}